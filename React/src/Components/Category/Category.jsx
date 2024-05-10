import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import './Style.css'

const Category = ({ user, categories, setCategories, removeCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");

    useEffect(() => {
        getCategories();
    }, [setCategories]);

    const updateCategoryName = async () => {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: selectedCategory.id, name: newCategoryName })
        };
        const response = await fetch(`api/categories/${selectedCategory.id}`, requestOptions);
        if (response.ok) {
            const updatedCategories = categories.map(category => {
                if (category.id === selectedCategory.id) {
                    return { ...category, name: newCategoryName };
                }
                return category;
            });
            setCategories(updatedCategories);
            closeModal();
        } else {
            console.error("Failed to update category");
        }
    };


    const openModal = (category) => {
        setSelectedCategory(category);
        setNewCategoryName(category.name);
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setNewCategoryName("");
    };

    const getCategories = () => {
        const requestOptions = {
            method: "GET",
        };
        return fetch('api/categories', requestOptions)
            .then((response) => response.json())
            .then(
                (data) => {
                    console.log("Data:", data);
                    setCategories(data);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    const deleteCategory = async ({ id }) => {
        const requestOptions = {
            method: "DELETE",
        };
        return await fetch(`api/categories/${id}`, requestOptions).then(
            (response) => {
                if (response.ok) {
                    removeCategory(id);
                }
            },
            (error) => console.log(error)
        );
    };

    function Categories() {
        return categories.map(({ id, name, product }) => (
            <div className="Category" key={id} id={id}>
                <strong>
                    {id}: {name}
                </strong>

                {user.isAuthenticated && user.userRole === "admin" ? (
                    <>
                        <button onClick={() => openModal({ id, name })}>Изменить</button>
                        <button onClick={() => deleteCategory({ id })}>Удалить</button>
                    </>
                ) : (
                    ""
                )}

                {product && <Product products={product} />}
            </div>
        ));
    }
    return (
        <>
            <h3>Список категорий</h3>
            <Categories />

            {selectedCategory && (
                <div className="modal">
                    <div className="modal-content">
                        <span onClick={closeModal} className="close">&times;</span>
                        <h2>Изменить название категории</h2>
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <button onClick={updateCategoryName}>Сохранить</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Category;