import React from 'react';
import cartStyle from './cart.module.css'

export default class Cart extends React.Component {

    setNumber(num) {
        let numString  = num.toString();
        let part  = [];
        let len = numString.length;
        while(len-3>=0) {
            part.push(numString.slice(len-3, len));
            len = len-3;
        }
        if(len!==0){
            part.push(numString.slice(0, len));
        }
        let output = ''
        for(let p=part.length-1; p>=0; p--) {
            if(p!==0) {
                output +=  part[p]+',';
                
            } else {
                output +=  part[p];

            }
        }
        return output;
    }

    render() {
        const {data, name, style} = this.props;
        let num = this.setNumber(data.value);
        return(
            <div className={cartStyle.cart_box} style={style}>
                <h2>{name}</h2>
                <h3>{num}</h3>
            </div>
        );
        
    }
}