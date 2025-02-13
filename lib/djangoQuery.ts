"use server"

import { TokenData } from "./typescript";

export const TokenFetch = async() => {
    const res = await fetch(`${process.env.DJANGO_API_URL}`,)
    const data: TokenData[] = await res.json();
    return data
  }