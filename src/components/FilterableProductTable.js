import React, { useState } from "react";

const ProductCategoryRow = props => {
  const category = props.category;
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
};

const ProductRow = props => {
  const product = props.product;
  const name = product.stocked ? (
    <span style={{ color: "red" }}>{product.name}</span>
  ) : (
    product.name
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const ProductTable = props => {
  const { filterText, inStockOnly } = props;

  const rows = [];
  let lastCategory = null;

  props.products.forEach(product => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const SearchBar = props => {
  const handleFilterTextChange = e => props.onFilterTextChange(e.target.value);

  const handleInStockChange = e => props.onInStockChange(e.target.checked);

  const { filterText, inStockOnly } = props;

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={handleFilterTextChange}
      />
      <p>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={handleInStockChange}
        />
        Only show products in stock
      </p>
    </form>
  );
};

function FilterableProductTable(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     filterText: "",
  //     inStockOnly: false,
  //   };
  //   this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  //   this.handleInStockChange = this.handleInStockChange.bind(this);
  // }

  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  function handleFilterTextChange(filterText) {
    // this.setState({
    //   filterText,
    // });
    setFilterText(filterText);
  }

  function handleInStockChange(inStockOnly) {
    // this.setState({
    //   inStockOnly,
    // });
    setInStockOnly(inStockOnly);
  }

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
      />
      <ProductTable
        products={props.products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

export default FilterableProductTable;
