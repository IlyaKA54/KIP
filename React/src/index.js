import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Category from "./Components/Category/Category"
import CreateCategory from "./Components/CreateCategory/CreateCategory"
import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"
import Register from "./Components/Register/Register"
import LogOff from "./Components/LogOff/LogOff"

const App = () => {
    const [categories, setCategories] = useState([])
    const addCategory = (category) => setCategories([...categories, category])
    const removeCategory = (removeId) =>
        setCategories(categories.filter(({ categoryId }) => categoryId !== removeId))
    const [user, setUser] = useState({ isAuthenticated: false, userName: "" , userRole:"" })

    useEffect(() => {
        const getUser = async () => {
            return await fetch("api/account/isauthenticated")
                .then((response) => {
                    response.status === 401 &&
                        setUser({ isAuthenticated: false, userName: "", userRole: "" })
                    return response.json()
                })
                .then(
                    (data) => {
                        if (
                            typeof data !== "undefined" &&
                            typeof data.userName !== "undefined"
                        ) {
                            setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole})
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getUser()
    }, [setUser])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout user={user} />}>
                    <Route index element={<h3>Главная страница</h3>} />
                    <Route
                        path="/categories"
                        element={
                            <>
                                <CreateCategory user={user} addCategory={addCategory} />
                                <Category
                                    user={user}
                                    categories={categories}
                                    setCategories={setCategories}
                                    removeCategory={removeCategory}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={<LogIn user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/register"
                        element={<Register user={user} setUser={setUser} />}
                    />
                    <Route path="/logoff" element={<LogOff setUser={setUser} />} />
                    <Route path="*" element={<h3>404</h3>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
)