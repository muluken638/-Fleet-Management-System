import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductManagement = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [vehicles, setvehicles] = useState([]);
  const [filteredvehicles, setFilteredvehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [modalType, setModalType] = useState(null); // 'add' or 'edit'
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchvehicles();
  }, []);

  const fetchvehicles = async () => {
    try {
      const response = await fetch(`${apiUrl}/vehicles`);
      if (!response.ok) throw new Error("Failed to fetch vehicles");
      const data = await response.json();
      setvehicles(data);
      setFilteredvehicles(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      const response = await fetch(`${apiUrl}/vehicles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to add product");
      const newProduct = await response.json();
      setvehicles([...vehicles, newProduct]);
      setFilteredvehicles([...vehicles, newProduct]);
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`${apiUrl}/vehicles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update product");
      const updatedProduct = await response.json();
      const updatedList = vehicles.map((p) => (p._id === id ? updatedProduct : p));
      setvehicles(updatedList);
      setFilteredvehicles(updatedList);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/vehicles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");
      const updatedList = vehicles.filter((p) => p._id !== id);
      setvehicles(updatedList);
      setFilteredvehicles(updatedList);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filterByCategory = (category) => {
    if (category === "all") {
      setFilteredvehicles(vehicles);
    } else {
      setFilteredvehicles(vehicles.filter((p) => p.category === category));
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString();
  };

  const currentvehicles = filteredvehicles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      {/* Filter Section */}
      <div className="mb-4 flex justify-between">
        <select
          className="border p-2"
          onChange={(e) => filterByCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="available">available</option>
          <option value="out_of_stock">out_of_stock</option>
          <option value="discontinued">discontinued</option>
        </select>

        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            setModalType("add");
            setModalData(null);
          }}
        >
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Updated At</th> {/* Added Updated At */}
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentvehicles.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">{product.stock}</td>
              <td className="border border-gray-300 p-2">{product.status}</td>
              <td className="border border-gray-300 p-2">
                {formatDate(product.updatedAt)} {/* Display formatted updatedAt */}
              </td>
              <td className="border border-gray-300 p-2 flex space-x-2">
                <button
                  className="bg-yellow-500 text-white p-1 rounded"
                  onClick={() => {
                    setModalType("edit");
                    setModalData(product);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="p-2 bg-gray-300 rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          className="p-2 bg-gray-300 rounded"
          disabled={currentPage * rowsPerPage >= filteredvehicles.length}
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredvehicles.length / rowsPerPage))
            )
          }
        >
          Next
        </button>
      </div>

      {/* Modals */}
      {modalType && (
        <Modal
          type={modalType}
          data={modalData}
          onClose={() => setModalType(null)}
          onSubmit={(product) => {
            modalType === "add"
              ? handleAddProduct(product)
              : handleUpdateProduct(modalData._id, product);
            setModalType(null);
          }}
        />
      )}
    </div>
  );
};

const Modal = ({ type, data, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(
    data || {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      status: "available",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {type === "add" ? "Add Product" : "Edit Product"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="border p-2 w-full"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              className="border p-2 w-full"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="price">
              Price
            </label>
            <input
              className="border p-2 w-full"
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="stock">
              Stock
            </label>
            <input
              className="border p-2 w-full"
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="category">
              Category
            </label>
            <input
              className="border p-2 w-full"
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium" htmlFor="status">
              Status
            </label>
            <select
              className="border p-2 w-full"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              {type === "add" ? "Add" : "Update"}
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductManagement;
