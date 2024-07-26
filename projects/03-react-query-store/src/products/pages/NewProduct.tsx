import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useProductMutation } from "..";
import { useEffect } from "react";

interface FormInput {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const IMAGE_DEFAULT =
  "https://www.jqueryscript.net/demo/responsive-card-slider/img/default.jpg";

export const NewProduct = () => {
  const productMutation = useProductMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      category: "men's clothing",
      description: "",
      image: "",
      price: 0,
      title: "",
    },
  });

  const newImage = watch("image");

  const onSubmit: SubmitHandler<FormInput> = (formData) => {
    productMutation.mutate(formData);
  };

  useEffect(() => {
    if (productMutation.isSuccess) {
      alert("producto creado");
    }
  }, [productMutation.isSuccess]);

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center gap-4">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { name, onChange, value } }) => (
                <Input
                  value={value}
                  name={name}
                  onChange={onChange}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                  color={errors.title ? "danger" : "default"}
                  // errorMessage={errors.title ? "Campo requerido" : ""}
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field: { name, onChange, value } }) => (
                <Input
                  color={errors.price ? "danger" : "default"}
                  name={name}
                  onChange={(event) => onChange(Number(event.target.value))}
                  value={value.toString()}
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field: { name, onChange, value } }) => (
                <Input
                  color={errors.image ? "danger" : "default"}
                  name={name}
                  onChange={onChange}
                  value={value}
                  className="mt-2"
                  type="url"
                  label="Url del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field: { name, onChange, value } }) => (
                <Textarea
                  color={errors.description ? "danger" : "default"}
                  name={name}
                  onChange={onChange}
                  value={value}
                  className="mt-2"
                  label="Descripcion del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field: { name, onChange, value } }) => (
                <select
                  name={name}
                  onChange={onChange}
                  value={value}
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              className="mt-2"
              color="primary"
              type="submit"
              isDisabled={productMutation.isPending}
              isLoading={productMutation.isPending}
            >
              Crear
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={newImage.length === 0 ? IMAGE_DEFAULT : newImage} />
          </div>
        </div>
      </form>
    </div>
  );
};
