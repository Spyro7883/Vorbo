
require("dotenv").config()
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type FormRegisterSchema = {
    name: string
    email: string
    password: string

}

const RegisterPopup = () => {
    const { register, handleSubmit } = useForm<FormRegisterSchema>()
    const onSubmit: SubmitHandler<FormRegisterSchema> = async (data) => {
        try {
            const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                const errorText = await response.text();
                console.error('Error response text:', errorText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <section>
            <h1>Registration Page</h1>
            <form method="post" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Name" {...register("name")} />
                <input type="email" placeholder="Email" {...register("email")} />
                <input type="password" placeholder="Password" {...register("password")} />
                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

export default RegisterPopup;