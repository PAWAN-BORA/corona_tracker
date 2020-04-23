import React from 'react';
import Cart from './cart/Cart';

export default class CartBox extends React.Component {

    
    render() {
        const {data:{confirmed, recovered, deaths, lastUpdate}} = this.props;
        // eslint-disable-next-line
        if(confirmed==undefined) {
            return(
                <div>
                    Loading...
                </div>
            );
        }
        let date = new Date(lastUpdate);
        return(
            <>
            <div className="cart_container">
               <Cart data={confirmed} name="Confirmed" lastupdate={"sd"} style={{background:"radial-gradient(#4C4BFF, #00007E)"}} bottomColor={{background:"#00FFFF"}}/>
               <Cart data={recovered} name="Recovered"style={{background:"radial-gradient(#62CF62, #0E5617)"}} bottomColor={{background:"#79FF7A"}} />
               <Cart data={deaths} name="Deaths" style={{background:"radial-gradient(#EC3839, #4F0000)"}} bottomColor={{background:"#FFCCCB"}}/>
            </div>
            <div className="last_date">Last Update: <span>{date.toDateString()+", "+  date.getUTCHours()+":"+date.getUTCMinutes()+" GMT"}</span></div>
            </>
        )
    }
}