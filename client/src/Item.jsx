import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import axios from "axios";

class Item extends Component {
  constructor() {
    super();
    this.state = {
      itemlist: [],
      show: false,
      editItem: [],
      removedItem: []
    };
  }

  ShowList = () => {
    axios.get("http://localhost:3000/items").then(res => {
      this.setState({
        itemlist: res.data
      });
    });
  };

  getOneItem = id => {
    this.setState({ show: true });
    axios.get(`http://localhost:3000/items/${id}`).then(res => {
      this.setState({
        editItem: res.data
      });
    });
  };

  updateItem = id => {
    axios
      .put(`http://localhost:3000/items/${id}`, {
        id: this.state.editItem.id,
        title: this.state.editItem.title,
        style: this.state.editItem.style,
        pic: this.state.editItem.pic,
        price: this.state.editItem.price,
        qyt: this.state.editItem.qyt,
        size: this.state.editItem.size,
        color: this.state.editItem.color
      })
      .then(() => {
        this.ShowList();
      })
      .then(this.setState({ show: false }));
  };

  deleteItem = id => {
    axios.delete(`http://localhost:3000/items/${id}`).then(res => {
      this.setState({
        editItem: res.data
      });
      this.ShowList();
    });
  };

  componentDidMount() {
    this.ShowList();
  }

  handleChnage = e => {
    let key = e.target.name;
    let value = e.target.value;
    this.setState(prevState => ({
      editItem: {
        ...prevState.editItem,
        [key]: value
      }
    }));
    console.log(value);
  };

  hideModal = e => {
    this.setState({ show: false });
  };

  render() {
    let showHideClassName = this.state.show
      ? "modal display-block"
      : "modal display-none";
    let total = this.state.itemlist
      .map(item => item.price * item.qyt)
      .reduce((Sum = 0, Total = 0) => Sum + Total, 0);

    return (
      <div className="main">
        <div className="main-title">
          {" "}
          <h3> your shopping card </h3>{" "}
        </div>
        <div className="main-title-des">
          {" "}
          <p>if the card is empty then we shall add the products for you </p>
        </div>
        <div className="Card">
          <ul className="CardList">
            <div className="labels">
              <div className="itemT"> ITEMS </div>{" "}
              <div className="sizeT"> SIZE </div>{" "}
              <div className="qytT"> QYT </div>{" "}
              <div className="priceT">PRICE</div>
            </div>
            <div className="seprator1" />

            {this.state.itemlist.map(item => (
              <div className="grid-container">
                <div className="item1">
                  {" "}
                  <li> {<img src={item.pic} />}</li>
                </div>
                <div className="item2">
                  {" "}
                  <div className="item-Des">
                    {" "}
                    <li> {item.title} </li>{" "}
                  </div>
                  <li> {item.style}</li>
                  <li> {item.color} </li>
                  <div className="AddRemoveButton">
                    <li>
                      <button
                        onClick={() => this.getOneItem(item.id)}
                        name="edit"
                        className="flex-child"
                      >
                        EDIT
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => this.deleteItem(item.id)}
                        name="remove"
                        className="flex-child"
                      >
                        {" "}
                        x REMOVE{" "}
                      </button>
                    </li>
                  </div>
                </div>
                <div className="item3">
                  {" "}
                  <li> {item.size} </li>
                </div>
                <div className="item4">
                  {" "}
                  <li>
                    {" "}
                    <input type="text" value={item.qyt} />{" "}
                  </li>
                </div>
                <div className="item5">
                  {" "}
                  <li> ${item.price * item.qyt} </li>
                </div>
                <li>
                  <div className="seprator2" />
                </li>
              </div>
            ))}
          </ul>

          <div className="price-grid-container">
            <div className="helpNote">
              <p>
                Need help or have quetion
                <br />
                Call Customer service at <br />
                1-800-555-555
              </p>
            </div>

            <div className="price-detail">
              <div className="notes">
                <div>
                  {" "}
                  <p> ENTER PROMOTION CODE OR A GIFT CARD </p>{" "}
                </div>
                <div className="promo-code">
                  {" "}
                  <input type="text" value="AJ10" />{" "}
                </div>
                <div className="promo-code-num">
                  {" "}
                  <button>APPLY</button>{" "}
                </div>
              </div>
              <div className="price-discription">
                <div>
                  <p> SUB TOTAL </p>
                </div>
                <div className="total">
                  <p>${total.toFixed(2)} </p>
                </div>
              </div>
              <div className="TotalPrice">
                <div>
                  {" "}
                  <p> PROMOTION CODE AJ10 APPLIED </p>{" "}
                </div>
                <div className="discount">
                  <p> ${(0.1 * total).toFixed(2)} </p>{" "}
                </div>
              </div>
              <div className="shipping">
                <p>
                  {" "}
                  ESTIMATED SHIPPING <br />
                  You quality for free shipping because your order is over 50${" "}
                </p>
                <div className="shipping-price">
                  {" "}
                  <p>{total >= 50 ? "FREE" : "$10.00"}</p>
                </div>
              </div>
              <div className="seprator3" />
              <div className="final-total-price">
                <div>
                  <p>
                    {" "}
                    ESTIMATED TOTAL
                    <br />
                    Tax will be applied during checkout{" "}
                  </p>
                </div>
                <div class="total-after-discount-shipping">
                  {" "}
                  <p>
                    {" "}
                    $
                    {total >= 50
                      ? (total - total * 0.1).toFixed(2)
                      : (total - total * 0.1 + 10).toFixed(2)}{" "}
                  </p>{" "}
                </div>

                <div className="purchase">
                  {" "}
                  <button> CHECK OUT </button>
                </div>
              </div>
            </div>
          </div>

          <div className={showHideClassName}>
            <div className="modal" />
            <section className="modal-main">
              <button onClick={this.hideModal}>x</button>

              <div className="edit-grid-container">
                <div className="editItem1">
                  {" "}
                  <img src={this.state.editItem.pic} />{" "}
                </div>

                <div className="editItem2">
                  <p id="titel">{this.state.editItem.title}</p>
                  <p id="price">
                    <span>$</span>
                    {this.state.editItem.price}
                    .00
                  </p>
                  <p id="style">{this.state.editItem.style}</p>

                  <div id="donate">
                    <label className="pink">
                      {" "}
                      <input
                        id="pink"
                        type="radio"
                        name="color"
                        value="pink"
                        onChange={this.handleChnage}
                      />{" "}
                      <span />
                    </label>
                    <label className="blue">
                      {" "}
                      <input
                        id="blue"
                        type="radio"
                        name="color"
                        value="blue"
                        onChange={this.handleChnage}
                      />{" "}
                      <span />
                    </label>
                    <label className="yellow">
                      {" "}
                      <input
                        id="yellow"
                        type="radio"
                        name="color"
                        value="yellow"
                        onChange={this.handleChnage}
                      />{" "}
                      <span />
                    </label>
                  </div>

                  <div className="editItem3">
                    {" "}
                    <p>Color : {this.state.editItem.color}</p>{" "}
                  </div>

                  <div className="editItem4">
                    <select
                      name="size"
                      onChange={this.handleChnage}
                      value={this.state.editItem.size}
                    >
                      <option> </option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>

                    <input
                      type="number"
                      name="qyt"
                      onChange={this.handleChnage}
                      step="1"
                      min="1"
                      value={this.state.editItem.qyt}
                    />
                  </div>

                  <div className="editItem5">
                    {" "}
                    <button
                      onClick={() => this.updateItem(this.state.editItem.id)}
                    >
                      {" "}
                      Edit{" "}
                    </button>{" "}
                  </div>
                  <p>
                    {" "}
                    <a href="#">check product detail </a>{" "}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
