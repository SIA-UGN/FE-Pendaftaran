"use server"

export async function getUsers() {
    const data = await fetch(`${process.env.APP_URL}/users`);
    const json = await data.json();
    return json.data;

}