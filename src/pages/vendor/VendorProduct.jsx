import React, { useState, useEffect } from "react";
import {
  Package2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  Star,
  AlertCircle,
  Tag,
} from "lucide-react";
import Button from "@/components/ui/custom/Button";
import CusSelect from "@/components/ui/custom/Select";
import Modal from "@/components/ui/Modal";
import Input from "@/components/input/Input";
import AddProduct from "./AddProduct";
import useVendorProductStore from "@/store/useVendorProductStore";
import useProductStore from "@/store/useProductStore";

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "Clothing", label: "Clothing" },
  { value: "Books", label: "Books" },
  { value: "Accessories", label: "Accessories" },
  { value: "Electronics", label: "Electronics" },
];

const VendorProduct = () => {
  const { editProduct, setEditProduct } = useVendorProductStore();
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (availability) =>
    availability
      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
      : "bg-gradient-to-r from-red-500 to-red-600 text-white";

  const getStatusText = (availability) =>
    availability ? "In Stock" : "Out of Stock";

  const handleAddProduct = async (values) => {
    let imageUrl;
    if (values.image instanceof File) {
      imageUrl = await fileToDataUrl(values.image);
    } else {
      imageUrl = editProduct?.images?.[0] || "";
    }

    if (editProduct) {
      updateProduct({
        ...editProduct,
        title: values.name,
        description: values.description,
        price: parseFloat(values.price),
        category: values.category,
        type: values.type,
        state: values.state,
        availability: values.availability,
        weight: values.weight,
        ingredients: values.ingredients,
        nutritionInfo: values.nutritionInfo,
        shelfLife: values.shelfLife,
        allergens: values.allergens,
        storage: values.storage,
        images: [imageUrl],
      });
    } else {
      const id = `PRD-${String(products.length + 1).padStart(3, "0")}`;
      addProduct({
        id,
        title: values.name,
        description: values.description,
        price: parseFloat(values.price),
        category: values.category,
        type: values.type,
        state: values.state,
        availability: values.availability,
        weight: values.weight,
        ingredients: values.ingredients,
        nutritionInfo: values.nutritionInfo,
        shelfLife: values.shelfLife,
        allergens: values.allergens,
        storage: values.storage,
        images: [imageUrl],
        rating: 0,
        reviews: [],
      });
    }

    setShowAddModal(false);
    setEditProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
    setSelectedProduct(null);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditProduct(null);
  };

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.availability).length,
    outOfStock: products.filter((p) => !p.availability).length,
  };

  return (
    <div className="min-h-screen bg-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full opacity-10 -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full opacity-10 translate-y-24 -translate-x-24" />

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-md backdrop-blur-sm">
                <Package2 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-Montserrat">Product Management</h1>
                <p className="text-white/70 mt-1">Manage your inventory and product catalog</p>
              </div>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              variant="secondary"
              iconType="icon-left"
              Icon={Plus}
              iconSize={20}
            >
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow-lg border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Products</p>
                <p className="text-2xl font-bold text-primary mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Package2 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">In Stock</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.inStock}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg border-l-4 border-destructive">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive mt-1">{stats.outOfStock}</p>
              </div>
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-3">
          <div className="flex md:items-center flex-col md:flex-row gap-4">
            <div className="md:flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products by name, description, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 bg-white mt-0"
              />
            </div>
            <div className="relative min-w-[200px]">
              <CusSelect
                Icon={Filter}
                selectValue="All Categories"
                value={categoryFilter}
                optionsLabel="Product Categories"
                onChange={(selected) => setCategoryFilter(selected.value)}
                options={categoryOptions}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Package2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search or add a new product.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 80}ms forwards`,
                  opacity: 0,
                }}
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-accent/20">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package2 className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.availability)}`}
                  >
                    {getStatusText(product.availability)}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{product.title}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500">{product.rating || 0}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-secondary" />
                      <span className="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-bold text-green-600">GH₵{product.price}</p>
                    <p className="text-xs text-secondary font-medium">{product.id}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedProduct(product)}
                      variant="secondary"
                      iconType="icon-left"
                      Icon={Eye}
                      iconSize={14}
                      className="!px-3 !py-1 !text-xs flex-1"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => {
                        setEditProduct(product);
                        setShowAddModal(true);
                      }}
                      variant="outline"
                      iconType="icon-only"
                      Icon={Edit}
                      iconSize={14}
                      className="!px-2 !py-1 !w-8 !h-8"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add / Edit Product Modal */}
        {showAddModal && (
          <Modal
            display={true}
            title={editProduct ? "Edit Product" : "Add New Product"}
            subTitle={
              editProduct ? `Editing ${editProduct.id}` : "Create a new product for your catalog"
            }
            Icon={Package2}
            onClose={closeModal}
          >
            <AddProduct handleAddProduct={handleAddProduct} onCancel={closeModal} />
          </Modal>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <Modal
            display={true}
            title="Product Details"
            subTitle={selectedProduct.id}
            Icon={Package2}
            onClose={() => setSelectedProduct(null)}
          >
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center md:flex-row gap-6">
                <div className="w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/20 rounded-xl overflow-hidden">
                  {selectedProduct.images?.[0] ? (
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package2 className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-700">{selectedProduct.title}</h3>
                    <p className="text-gray-600 mt-1">{selectedProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-2xl font-bold text-green-600">GH₵{selectedProduct.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProduct.availability)}`}
                      >
                        {getStatusText(selectedProduct.availability)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-gray-900">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-medium">{selectedProduct.rating || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Food Specs in Modal */}
                  {(selectedProduct.ingredients || selectedProduct.weight) && (
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                      {selectedProduct.weight && (
                        <div>
                          <p className="text-xs text-gray-400 font-medium uppercase">Weight</p>
                          <p className="text-sm text-gray-700">{selectedProduct.weight}</p>
                        </div>
                      )}
                      {selectedProduct.shelfLife && (
                        <div>
                          <p className="text-xs text-gray-400 font-medium uppercase">Shelf Life</p>
                          <p className="text-sm text-gray-700">{selectedProduct.shelfLife}</p>
                        </div>
                      )}
                      {selectedProduct.allergens && (
                        <div className="col-span-2">
                          <p className="text-xs text-red-400 font-medium uppercase">Allergens</p>
                          <p className="text-sm text-red-600 font-medium">{selectedProduct.allergens}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => handleDeleteProduct(selectedProduct.id)}
                  variant="outline"
                  iconType="icon-left"
                  Icon={Trash2}
                  iconSize={16}
                  className="!border-red-300 !text-red-600 hover:!bg-red-50"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => setSelectedProduct(null)}
                  variant="primary"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default VendorProduct;
