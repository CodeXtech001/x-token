"use client"

import { Provider } from "react-redux";
import { store } from "@/app/store";
import { useEffect } from "react";
import ChatButton from "../ChatButton";

function index({children}: { children: React.ReactNode;}) {

  useEffect(() => {
    const scriptId = "smartsupp-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = '1a0dc4b7036c8730a287b55b784427849b607406';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
      })(document);

       // Custom Chat Colors
      window.smartsupp = window.smartsupp || {};
      window.smartsupp.on = window.smartsupp.on || function () {};
      window.smartsupp.on("widget:ready", function () {
        window.smartsupp.widget.setOptions({
          theme: {
            primaryColor: "#60a5f0", // Change to your brand color
            textColor: "#FFFFFF",    // White text color
            backgroundColor: "#000000" // Dark background
          }
        });
      });
    `;
    document.body.appendChild(script);
  }, []);

  return (
    <Provider store={store}>
       {children}
    </Provider>
  )
}

export default index