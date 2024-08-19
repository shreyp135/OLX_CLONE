import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/items/my-items', {
        headers: { Authorization: token },
      });
      setItems(res.data);
    };
    fetchItems();
  }, []);


  return (
    <div>
      <h2 className='text-center mt-4 font-semibold text-3xl'>My Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price} - {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
