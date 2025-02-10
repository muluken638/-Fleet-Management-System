import React, { useState } from 'react';

const VehicleCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sedan' },
    { id: 2, name: 'Van' },
    { id: 3, name: 'Truck' },
    { id: 4, name: 'Electric' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null); // Track the category being edited
  const [editCategoryName, setEditCategoryName] = useState(''); // Track the edited name

  // Add a new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: categories.length + 1, name: newCategory }]);
      setNewCategory('');
    }
  };

  // Delete a category
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Start editing a category
  const handleEditCategory = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    setEditingCategory(categoryToEdit);
    setEditCategoryName(categoryToEdit.name);
  };

  // Save the edited category
  const handleSaveEdit = () => {
    if (editCategoryName.trim()) {
      const updatedCategories = categories.map((category) =>
        category.id === editingCategory.id ? { ...category, name: editCategoryName } : category
      );
      setCategories(updatedCategories);
      setEditingCategory(null); // Stop editing
      setEditCategoryName(''); // Clear the edit input
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditCategoryName('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vehicle Categories</h1>

      {/* Add New Category */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border rounded-lg flex-1"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Category Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-2 border">{category.id}</td>
                <td className="px-4 py-2 border">
                  {editingCategory?.id === category.id ? (
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="p-2 border rounded-lg"
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className="px-4 py-2 border flex gap-2">
                  {editingCategory?.id === category.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition duration-200"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditCategory(category.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleCategories;