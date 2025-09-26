"use client";
import React from "react";
export default class ErrorBoundary extends React.Component<{children: React.ReactNode},{hasError:boolean;err:Error|null}>{
  constructor(props: { children: React.ReactNode }) {super(props);this.state={hasError:false,err:null};}
  static getDerivedStateFromError(err:Error){return{hasError:true,err};}
  componentDidCatch(err:Error,info:React.ErrorInfo){console.error("App crashed:",err,info);}
  render(){return this.state.hasError
    ? <div style={{background:"#0b1020",color:"#fff",minHeight:"100vh",padding:20}}>
        <h1>❌ App crashed</h1>
        <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.err)}</pre>
      </div>
    : this.props.children;}
}