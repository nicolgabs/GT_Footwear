/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const MensPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/gt/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching the products:', error);
            });
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const addToCart = async (product, quantity, size) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/gt/cart/add/', {
                product: product.id,
                quantity,
                size
            },{
                withCredentials:true
            });
            console.log('Product added to cart:', response.data);
            
        } catch (error) {
            console.error('Error adding product to cart:', error);
            
        }
    };

    return (
        <div className="h-auto flex justify-center flex-wrap m-10">
            {products.map(product => {
                if (product.gender === "Mens") {
                    return (
                        <div key={product.id} className="w-[200px] h-[320px] rounded overflow-hidden shadow-lg m-4">
                            <img className="w-[200px]" src={product.picture_url} alt={product.name} />
                            <div className="px-6 py-4">
                                <div className="font-bold text-md mb-2">{product.name}</div>
                                <p className="text-gray-700 text-sm">{product.brand_name}</p>
                                <div className='flex flex-row justify-between'>
                                    <p className="text-gray-900 text-sm font-bold">{product.price} PHP</p>
                                    <FontAwesomeIcon 
                                        icon={faShoppingCart} 
                                        style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} 
                                        onClick={() => openModal(product)} 
                                    />
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            })}
            {selectedProduct && (
                <Modal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onAddToCart={addToCart}
                />
            )}
        </div>
    );
};


const Modal = ({ product, isOpen, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [availableSizes, setAvailableSizes] = useState([])
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    useEffect(() => {
        if (product && isOpen) {
            axios.get(`http://127.0.0.1:8000/gt/sizes/${product.id}/`)
                .then(response => {
                    setAvailableSizes(response.data);
                })
                .catch(error => {
                    console.error('Error fetching sizes:', error);
                });
        }
        
    }, [product, isOpen]);

    useEffect(() => {
        if (size) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [size]);

    if (!isOpen) return null;

    const handleAddToCart = () => {
        onAddToCart(product, quantity, size);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <img className="w-[200px]" src={product.picture_url} alt={product.name} />
                <h2 className="text-xl mb-4">{product.name}</h2>
                <div className="mb-4">
                    <label className="block mb-2">Available Sizes</label>
                    <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full p-2 border rounded">
                        <option value="" disabled>Select a size</option>
                        {availableSizes.map(size => (
                            <option key={size} value={size.id}>{size.size}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Quantity</label>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        min="1" 
                        className="w-full p-2 border rounded" 
                    />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleAddToCart} disabled={isButtonDisabled} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                        Add to Cart
                    </button>
                    <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MensPage;
