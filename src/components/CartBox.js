import React from 'react';
import Cart from './cart/Cart';

export default class CartBox extends React.Component {

    

    render() {
        const {data:{confirmed, recovered, deaths, lastUpdate}} = this.props;
        if(confirmed==undefined) {
            return(
                <div>
                    Loading...
                </div>
            );
        }
        return(
            <>
            <div className="cart_container">
               <Cart data={confirmed} name="Confirmed" lastupdate={"sd"} style={{background:"blue"}}/>
               <Cart data={recovered} name="Recovered"style={{background:"green"}}/>
               <Cart data={deaths} name="Deaths" style={{background:"red"}}/>
            </div>
            <div className="last_date">Last Update: <span>{new Date(lastUpdate).toDateString()}</span></div>
            </>
        )
    }
}