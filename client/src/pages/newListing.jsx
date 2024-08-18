import React from 'react'

export default function newListing() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getListing('token');
        const res = await axios.post(
          '/api/listings',
          { name, price },
          {
            headers: { Authorization: token },
          }
        );
        setItems([...items, res.data]);
      };
    

  return (<>
    <div>newListing</div>
    <h1>My Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </>
  )
}
