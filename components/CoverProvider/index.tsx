"use client"

import { Provider } from "react-redux";
import { store } from "@/app/store";

function index({children}: { children: React.ReactNode;}) {
  return (
    <Provider store={store}>
       {children}
    </Provider>
  )
}

export default index