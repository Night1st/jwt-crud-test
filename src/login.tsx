import React, { useState } from "react";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post("https://dev.thabicare.zenix.com.vn/api/v1/user-login/", {
                username,
                password
            });
            console.log(response.data.access_token)
            localStorage.setItem("token", response.data.access_token)
            navigate("/home")
        }catch {
            setError("Login error!")
        }
    };
    return (
        <>
            <div className="relative min-h-screen w-screen flex-col items-center justify-center grid max-w-none grid-cols-2 px-0">
                <div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r flex">
                    <div className="absolute inset-0 bg-zinc-900 login-background" />
                    {/* <div className="relative z-20 flex items-center text-lg font-medium">
                        <Image src="/logo_single.svg" width={48} height={48} alt="Logo" />
                        &nbsp; X
                    </div> */}
                    <div className="relative z-20 mt-auto">
                        <h1 className="text-4xl font-semibold tracking-tight">
                            Give your business everything it need to grow
                        </h1>
                        <p className="mt-4 text-lg">
                            Give it an extra sales channel with ZERO listing costs.
                        </p>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">Copyright &copy; X  2023</p>
                        </blockquote>
                    </div>
                </div>
                <div className="p-4 max-w-md mx-auto">
                <h2 className="text-lg font-bold">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 w-full"
                    />
                    </div>
                    <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full"
                    />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
                    Login
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
                </div>
            </div>
        </>
      );
}

export default Login