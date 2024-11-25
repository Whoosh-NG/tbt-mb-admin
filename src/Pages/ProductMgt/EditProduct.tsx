import GoBackBtn from "@/components/ui/GoBackBtn";
import { IServerError } from "@/types/GlobalInterfaces";
import FormInput from "@/components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useDeleteProductsImgsMutation,
  useGetAllMarketsQuery,
  useGetAllBrandsQuery,
  useGetCategoriesByMarketIdQuery,
  useGetProductByIdQuery,
  useUpdateProductsMutation,
} from "@/api/apiSlice";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { AddNewProductData, ProductIamges } from "@/types/Products";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductGallery from "@/components/Main/Products/ProductGallery";
import { useGlobalHooks } from "@/Hooks/globalHooks";

const EditProduct = () => {
  const { id } = useParams();
  const [delImg] = useDeleteProductsImgsMutation();
  const { setLoading, loading } = useGlobalHooks();
  const navigate = useNavigate();

  const [updateProduct, { isLoading }] = useUpdateProductsMutation();
  const { data: brands, isLoading: branding } = useGetAllBrandsQuery({});
  const { data: markets, isLoading: marketing } = useGetAllMarketsQuery({});
  const {
    data: product,
    // isLoading: producting,
    refetch,
  } = useGetProductByIdQuery(id as string, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const initialValues = {
    product_id: id,
    name: product?.data?.name as string,
    location: product?.data?.location as string,
    sale_price: product?.data?.sale_price.toString(),
    tbt_price: product?.data?.tbt_price.toString(),
    description: product?.data?.description as string,
    unit: product?.data?.unit as string,
    minimum_purchase: `${product?.data?.minimum_purchase}`,
    category_id: `${product?.data?.category_id}`,
    quantity: `${product?.data?.quantity}`,
    other_info: product?.data?.other_info as string,
    weight: product?.data?.weight as string,
    market_type: product?.data?.market_type as string,
    market_id: `${product?.data?.market_id}`,
    brand_id: product?.data?.brand_id ?? "",
    is_top_deal: `${product?.data?.is_top_deal}`,
  };
  const [getImages, setGetImages] = useState<{
    images: File[] | null;
    featured_image: File | string | null;
  }>({
    images: null,
    featured_image: null,
  });

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
      const rsp = await updateProduct(payload);
      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to create product",
        );
      } else {
        toast.success(rsp?.data?.message);
        navigate("/products-management");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const shippingSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
    location: Yup.string().required("Phone number is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: shippingSchema,
      onSubmit,
    });

  const { data: categories, isLoading: categoring } =
    useGetCategoriesByMarketIdQuery(values?.market_id);

  const handleDeleteImg = async (imgId: string) => {
    setLoading({ [imgId]: true });
    try {
      const rsp = await delImg({ image_id: imgId, product_id: id });
      if (rsp?.error) {
        toast.error(
          (rsp?.error as IServerError).data.message ||
            "Unable to create product",
        );
        setLoading({ [imgId]: false });
      } else {
        toast.success(rsp?.data?.message);
        setLoading({ [imgId]: false });
        refetch();
      }
    } catch (error) {
      console.log(error);
      setLoading({ [imgId]: false });
    }
  };

  return (
    <main className="container my-10">
      <header className="flex items-center gap-2">
        <GoBackBtn className="outline-btn" />
        <h3>Edit Product</h3>
      </header>

      <section className="space-y-4 py-6">
        <div className="my-6 flex w-full flex-wrap gap-6">
          {product?.data?.featured_image && (
            <div className="w-full lg:w-2/12">
              <small>Featured Images</small>
              <figure className="overflow-hidden rounded-xl">
                <img
                  src={product?.data?.featured_image}
                  alt=""
                  className="!h-full object-cover"
                />
              </figure>
            </div>
          )}

          {(product?.data?.images as ProductIamges[])?.length > 0 && (
            <div className="w-full lg:w-6/12">
              <small>Other Images</small>
              <ProductGallery
                imageList={product?.data?.images as ProductIamges[]}
                action={handleDeleteImg}
                loading={loading}
                className="!flex-row-reverse"
              />
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap justify-between gap-3"
        >
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Product Name"
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
            label="Sale Price"
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
            label="Tbt Price"
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
            label="Location"
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
            label="Minimum Purchase"
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
            label="Unit"
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
            label="Product weight in kg"
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
            label="Available Quantity"
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
            label="Select market type"
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
              label="Select market"
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
              label="Select category"
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
              label="Select brand"
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
            label="Enter description"
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
              Save Changes
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditProduct;
