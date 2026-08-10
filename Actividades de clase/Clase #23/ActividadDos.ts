interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

type ProductoForm = {
  nombre: string;
  precio: number;
  stock: number;
};

type PatchProducto = Partial<ProductoForm>;

const formularioProducto: ProductoForm = {
  nombre: "Laptop",
  precio: 1500,
  stock: 10,
};

const patchProducto: PatchProducto = {
  precio: 1400,
};
