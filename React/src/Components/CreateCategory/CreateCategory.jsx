import React from "react";

const CategoryCreate = ({ user, addCategory }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const { value } = e.target.elements.name;
        const category = { name: value };

        const createCategory = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category),
            };

            const response = await fetch('api/categories/', requestOptions);
            return await response.json().then(
                (data) => {
                    console.log(data);
                    if (response.ok) {
                        addCategory(data);
                        e.target.elements.name.value = "";
                    }
                },
                (error) => console.log(error)
            );
        };
        createCategory();
    };

    return (
        <>
            {user.isAuthenticated && user.userRole === "admin" ? (
                <>
                    <h3>Создание новой категории</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Название: </label>
                        <input type="text" name="name" placeholder="Введите название:" />
                        <button type="submit">Создать</button>
                    </form>
                </>
            ) : (
                ""
            )}
        </>
    )
};

export default CategoryCreate;