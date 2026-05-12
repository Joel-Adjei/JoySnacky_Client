import FileSelect from "@/components/input/FileSelect";
import InputField from "@/components/input/InputField";
import Button from "@/components/ui/custom/Button";
import Label from "@/components/ui/custom/Label";
import CusSelect from "@/components/ui/custom/Select";
import { categoryOptions } from "@/lib/data";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DollarSign, Package2, PenLineIcon, Plus, Type } from "lucide-react";
import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";
import Switch from "@/components/ui/custom/Switch";
import useVendorProductStore from "@/store/useVendorProductStore";

const validationSchema = (isEdit) =>
  Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    price: Yup.number("Price must be a number")
      .required("Price is required")
      .positive("Price must be positive"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    type: Yup.string().required("Type is required"),
    state: Yup.string(),
    availability: Yup.boolean().required("Availability is Required"),
    weight: Yup.string(),
    ingredients: Yup.string(),
    nutritionInfo: Yup.string(),
    shelfLife: Yup.string(),
    allergens: Yup.string(),
    storage: Yup.string(),
    image: isEdit ? Yup.mixed().nullable() : Yup.mixed().required("Product image is required"),
  });

const AddProduct = ({ handleAddProduct, onCancel }) => {
  const {editProduct , setEditProduct} = useVendorProductStore();

  const isEdit = !!editProduct;

  const formik = useFormik({
    initialValues: {
      name: editProduct?.title ?? "",
      price: editProduct?.price ?? "",
      description: editProduct?.description ?? "",
      category: editProduct?.category ?? "",
      type: editProduct?.type ?? "",
      state: editProduct?.state ?? "",
      availability: editProduct?.availability ?? false,
      weight: editProduct?.weight ?? "",
      ingredients: editProduct?.ingredients ?? "",
      nutritionInfo: editProduct?.nutritionInfo ?? "",
      shelfLife: editProduct?.shelfLife ?? "",
      allergens: editProduct?.allergens ?? "",
      storage: editProduct?.storage ?? "",
      image: null,
    },
    validationSchema: validationSchema(isEdit),
    onSubmit: (values , {setSubmitting}) => {
      setSubmitting(true);
      console.log(values);
      if(values.type === "Product" && !values.state){
        toast.info("Please select the product state.");
        setSubmitting(false);
        return;
      }
      handleAddProduct(values);
      setSubmitting(false);
    },
  });

  return (
    <div>
      <form className="px-6 space-y-6" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputField
              label={"Product Name"}
              Icon={Package2}
              name={"name"}
              type="text"
              value={formik.values.name}
              formik={formik}
              isRequired
              placeholder="Enter product name"
            />
          </div>

          <div>
            <InputField
              label={"Price (GH₵)"}
              Icon={DollarSign}
              name={"price"}
              value={formik.values.price}
              formik={formik}
              placeholder="0.00"
              isRequired
            />
          </div>
        </div>

        <div>
          <InputField
            label={"Description"}
            Icon={PenLineIcon}
            name={"description"}
            as="textarea"
            value={formik.values.description}
            formik={formik}
            rows="3"
            isRequired
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label label="Type" htmlFor="type" Icon={Type} isRequired />
            <CusSelect
              selectValue="Select Type"
              value={formik.values.type}
              optionsLabel="Types"
              onChange={(selected) =>
                formik.setFieldValue("type", selected.value)
              }
              options={[
                { label: "Product", value: "Product" },
                { label: "Service", value: "Service" },
              ]}
            />
            {
              formik.touched.type && formik.errors.type && (
                <div className="text-red-500 text-xs ml-3 mt-1">
                  {formik.errors.type}
                </div>
              )
            }
          </div>

          <div>
            <Label label="Category" htmlFor="category" Icon={FaCartArrowDown} isRequired />
            <CusSelect
              selectValue="Select Category"
              value={formik.values.category}
              optionsLabel="Categories"
              onChange={(selected) =>
                formik.setFieldValue("category", selected.value)
              }
              options={categoryOptions.filter((opt) => opt.value !== "all")}
            />
            {
              formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-xs ml-3 mt-1">
                  {formik.errors.category}
                </div>
              )
            }
          </div>

          {formik.values.type === "Product" && (
            <div>
              <CusSelect
                value={formik.values.state}
                selectValue="Select State"
                optionsLabel="State"
                onChange={(selected) =>
                  formik.setFieldValue("state", selected.value)
                }
                options={[
                  { label: "New", value: "new" },
                  { label: "Used", value: "used" },
                ]}
              />
              {
                formik.touched.state && formik.errors.state && (
                  <div className="text-red-500 text-xs ml-3 mt-1">
                    {formik.errors.state}
                  </div>
                )
              }
            </div>
          )}
        </div>

        {/* Food Specific Fields */}
        <div className="space-y-6 pt-4 border-t border-dashed border-gray-200">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
            <Package2 className="w-4 h-4" />
            Food Specifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={"Weight / Volume"}
              name={"weight"}
              type="text"
              value={formik.values.weight}
              formik={formik}
              placeholder="e.g. 250g, 500ml"
            />
            <InputField
              label={"Shelf Life"}
              name={"shelfLife"}
              type="text"
              value={formik.values.shelfLife}
              formik={formik}
              placeholder="e.g. 3 weeks, 2 days"
            />
          </div>

          <InputField
            label={"Ingredients"}
            name={"ingredients"}
            as="textarea"
            value={formik.values.ingredients}
            formik={formik}
            rows="2"
            placeholder="List the ingredients..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={"Nutrition Info"}
              name={"nutritionInfo"}
              type="text"
              value={formik.values.nutritionInfo}
              formik={formik}
              placeholder="e.g. Calories, Protein contents"
            />
            <InputField
              label={"Allergens"}
              name={"allergens"}
              type="text"
              value={formik.values.allergens}
              formik={formik}
              placeholder="e.g. Contains Nuts, Gluten"
            />
          </div>

          <InputField
            label={"Storage Instructions"}
            name={"storage"}
            type="text"
            value={formik.values.storage}
            formik={formik}
            placeholder="e.g. Refrigerate after opening"
          />
        </div>

        <div>
          <FileSelect
            isRequired
            onFilesChange={(files) => formik.setFieldValue("image", files[0])}
            label="Upload Product Images"
            acceptedTypes="image/*,.pdf"
            maxFiles={1}
            maxSizeMB={5}
          />

          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-xs ml-3 mt-1">
              {formik.errors.image}
            </div>
          )}
        </div>

        <div>
          <Switch
            id="availability"
            description={formik.values.availability ? "Available" : "Unavailable"}
            label="Product Availability"
            checked={formik.values.availability}
            onChange={(checked) => {
              formik.setFieldValue("availability", checked)
            }}
            size="small"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            type="button"
            onClick={() => onCancel()}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type={"submit"}
            variant="primary"
            iconType="icon-left"
            Icon={Plus}
            iconSize={16}
            className="flex-1"
            disabled={formik.isSubmitting}
          >
            {isEdit ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
