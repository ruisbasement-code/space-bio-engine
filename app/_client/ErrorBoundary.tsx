"use client";
import React from "react";
export default class ErrorBoundary extends React.Component<{children: React.ReactNode},{hasError:boolean;err:any}>{
  constructor(p:any){super(p);this.state={hasError:false,err:null};}
  static getDerivedStateFromError(err:any){return{hasError:true,err};}
  componentDidCatch(err:any,info:any){console.error("App crashed:",err,info);}
  render(){return this.state.hasError
    ? <div style={{background:"#0b1020",color:"#fff",minHeight:"100vh",padding:20}}>
        <h1>❌ App crashed</h1>
        <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.err)}</pre>
      </div>
    : this.props.children;}
}