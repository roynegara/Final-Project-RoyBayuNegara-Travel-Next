import React, { useEffect, useState } from "react";
import axios from "axios";


export async function getServerSideProps(context) {
    try {
        const resp = await axios.get(
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${context.params.id}`,
            {
                headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
            }
        );
        return { props: { category: resp.data.data } };
    } catch (error) {
        console.error("Error fetching category:", error);
        return { props: { category: null } };
    }
}

export default function CategoryById({ category }) {

    return (
        <div>
            <img src={category?.imageUrl} alt={category?.name} />
            <h3>{category?.id}</h3>
            <h1>This is {category?.name} Category</h1>
        </div>
    );
}