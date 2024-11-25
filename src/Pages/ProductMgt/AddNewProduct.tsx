import GoBackBtn from "@/components/ui/GoBackBtn";
import { IServerError } from "@/types/GlobalInterfaces";
import FormInput from "@/components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useCreateProductsMutation,
  useGetAllMarketsQuery,
  useGetBrandsQuery,
  useGetCategoriesByMarketIdQuery,
} from "@/api/apiSlice";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { AddNewProductData } from "@/types/Products";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const initialValues = {
  name: "",
  location: "",
  sale_price: "",
  tbt_price: "",
  description: "",
  unit: "",
  minimum_purchase: "",
  category_id: "",
  quantity: "",
  other_info: "",
  weight: "",
  market_type: "",
  market_id: "",
  brand_id: "",
  is_top_deal: "",
};
const AddNewProduct = () => {
  const [newProduct, { isLoading }] = useCreateProductsMutation();
  const { data: markets, isLoading: marketing } = useGetAllMarketsQuery({});
  const { data: brands, isLoading: branding } = useGetBrandsQuery({});

  const [getImages, setGetImages] = useState<{
    images: File[] | null;
    featured_image: File | null;
  }>({ images: null, featured_image: null });

  const onSubmit = async (formData: AddNewProductData) => {
    const payload = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof AddNewProductData];
      if (value !== undefined && value !== null) {
        payload.append(key, value as string);
      }
    });

    // Append images (if any)
    if (getImages.images) {
      Array.from(getImages.images).forEach((image, index) => {
        payload.append(`images[${index}]`, image);
      });
    }

    // Append featured image
    if (getImages.featured_image) {
      payload.append("featured_image", getImages.featured_image);
    }

    try {
      const rsp = await newProduct(payload);
      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to create product",
        );
      } else {
        toast.success(rsp?.data?.message);
        resetForm();
        setGetImages({ images: null, featured_image: null });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shippingSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
    location: Yup.string().required("Phone number is required"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: shippingSchema,
    onSubmit,
  });

  const { data: categories, isLoading: categoring } =
    useGetCategoriesByMarketIdQuery(values?.market_id);

  return (
    <main className="container my-10">
      <header className="flex items-center gap-2">
        <GoBackBtn className="outline-btn" />
        <h3>Add New Product</h3>
      </header>

      <section className="space-y-4 py-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-between gap-3"
        >
          <FormInput
            id="name"
            name="name"
            type="text"
            placeholder="Enter product name"
            defaultValue={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.name && errors.name}
            className="inputWrapper"
          />
          <FormInput
            id="sale_price"
            name="sale_price"
            type="tel"
            placeholder="Enter sale price"
            defaultValue={values.sale_price}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.sale_price && errors.sale_price}
            className="inputWrapper"
          />
          <FormInput
            id="tbt_price"
            name="tbt_price"
            type="tel"
            placeholder="Enter tbt price"
            defaultValue={values.tbt_price}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.tbt_price && errors.tbt_price}
            className="inputWrapper"
          />
          <FormInput
            id="location"
            name="location"
            type="text"
            placeholder="Enter Location"
            defaultValue={values.location}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.location && errors.location}
            className="inputWrapper"
          />
          <FormInput
            id="minimum_purchase"
            name="minimum_purchase"
            type="tel"
            placeholder="Enter minimum purchase"
            defaultValue={values.minimum_purchase}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.minimum_purchase && errors.minimum_purchase}
            className="w-full md:w-[24%]"
          />
          <FormInput
            id="unit"
            name="unit"
            type="tel"
            placeholder="Enter unit"
            defaultValue={values.unit}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.unit && errors.unit}
            className="w-full md:w-[24%]"
          />
          <FormInput
            id="weight"
            name="weight"
            type="tel"
            placeholder="Enter weight in kg"
            defaultValue={values.weight}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.weight && errors.weight}
            className="w-full md:w-[24%]"
          />
          <FormInput
            id="quantity"
            name="quantity"
            type="tel"
            placeholder="Enter quantity"
            defaultValue={values.quantity}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.quantity && errors.quantity}
            className="w-full md:w-[24%]"
          />
          <FormInput
            id="market_type"
            name="market_type"
            type="select"
            selectOptions={["mile12market", "b2b"]}
            placeholder="Select market type"
            defaultValue={values.market_type}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.market_type && errors.market_type}
            className="w-full md:w-[24%]"
          />

          {marketing ? (
            <Skeleton height={50} containerClassName="flex-1" />
          ) : (
            <FormInput
              id="market_id"
              name="market_id"
              type="select"
              placeholder="Select market"
              selectOptions={markets?.data}
              valuePropertyName="id"
              keyPropertyName="id"
              itemPropertyName="name"
              defaultValue={values.market_id}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.market_id && errors.market_id}
              className="w-full md:w-[24%]"
            />
          )}

          {categoring ? (
            <Skeleton height={50} containerClassName="flex-1" />
          ) : (
            <FormInput
              id="category_id"
              name="category_id"
              type="select"
              placeholder="Select category"
              selectOptions={categories?.data}
              valuePropertyName="id"
              keyPropertyName="id"
              itemPropertyName="name"
              defaultValue={values.category_id}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.category_id && errors.category_id}
              className="w-full md:w-[24%]"
            />
          )}

          {branding ? (
            <Skeleton height={50} containerClassName="flex-1" />
          ) : (
            <FormInput
              id="brand_id"
              name="brand_id"
              type="select"
              placeholder="Select brand"
              selectOptions={brands?.data}
              valuePropertyName="id"
              keyPropertyName="id"
              itemPropertyName="name"
              defaultValue={values.brand_id}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.brand_id && errors.brand_id}
              className="w-full md:w-[24%]"
            />
          )}
          <FormInput
            id="images"
            name="images"
            type="file"
            label="You can select multiple images"
            placeholder="Select brand"
            onBlur={handleBlur}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const files = e.target.files;
                // const formData = new FormData();

                // formData.append("images[]", files);
                setGetImages((prev) => ({
                  ...prev,
                  ["images"]: files,
                }));
              }
            }}
            className="w-full md:w-[24%]"
            multiple
            accept="image/*"
          />
          <FormInput
            id="featured_image"
            name="featured_image"
            type="file"
            label="Select product display image"
            onBlur={handleBlur}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                // const formData = new FormData();
                // formData.append("featured_image", files);

                setGetImages((prev) => ({
                  ...prev,
                  ["featured_image"]: file,
                }));
              }
            }}
            className="w-full md:w-[24%]"
            accept="image/*"
          />
          <FormInput
            id="other_info"
            name="other_info"
            type="text"
            label="Enter any other info for this product"
            placeholder="Enter other info"
            defaultValue={values.other_info}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.other_info && errors.other_info}
            className="w-full md:w-[24%]"
          />
          <FormInput
            id="is_top_deal"
            name="is_top_deal"
            type="checkbox"
            label="Mark as top deal product"
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.is_top_deal && errors.is_top_deal}
            className="w-full md:w-[24%]"
            accept="image/*"
          />
          <FormInput
            id="description"
            name="description"
            type="textarea"
            placeholder="Enter description"
            defaultValue={values.description}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.description && errors.description}
            className="inputWrapper"
          />
          <div className="mt-6 flex w-full items-center gap-3">
            <Button type="submit" loading={isLoading}>
              {" "}
              Add Product
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddNewProduct;
