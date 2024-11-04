import { Heart, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import Header from '../components/Header';

export const products = [
  {
    id: 1,
    title: 'Conjunto de Panelas Antiaderentes',
    description: 'Kit completo com 5 peças, ideal para sua cozinha. Material de alta qualidade e durabilidade.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1584990347449-a8f11f6a9760?auto=format&fit=crop&q=80&w=800',
    stock: 15
  },
  {
    id: 2,
    title: 'Liquidificador Profissional',
    description: 'Potência de 1200W, copo de vidro resistente, 12 velocidades.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=800',
    stock: 8
  },
  {
    id: 3,
    title: 'Kit Utensílios de Silicone',
    description: 'Conjunto com 8 peças, resistente ao calor, fácil de limpar.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800',
    stock: 20
  }
];

interface GiftList {
  id: string;
  name: string;
  date: string;
  description: string;
  items: number[];
}

export function GiftRegistry() {
  const [lists, setLists] = useState<GiftList[]>([]);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  
  const [newList, setNewList] = useState({
    name: '',
    date: '',
    description: ''
  });

  const createNewList = (e: React.FormEvent) => {
    e.preventDefault();
    const list: GiftList = {
      id: Date.now().toString(),
      items: [],
      ...newList
    };
    setLists([...lists, list]);
    setNewList({ name: '', date: '', description: '' });
    setShowNewListForm(false);
  };

  const addToList = (listId: string, productId: number) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: [...list.items, productId]
        };
      }
      return list;
    }));
  };

  const removeFromList = (listId: string, productId: number) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter(id => id !== productId)
        };
      }
      return list;
    }));
  };

  const deleteList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId));
    setSelectedList(null);
  };

  return (
    <>
    <Header />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Lista de Presentes</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Crie sua lista de presentes para casamento, aniversário ou qualquer ocasião especial.
        </p>
        
        <button
          onClick={() => setShowNewListForm(true)}
          className="bg-red-600 text-white px-6 py-3 rounded-md inline-flex items-center gap-2 hover:bg-red-700 transition-colors"
        >
          <Plus size={20} />
          Criar Nova Lista
        </button>
      </div>

      {showNewListForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <form onSubmit={createNewList} className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Nova Lista de Presentes</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Lista
                </label>
                <input
                  type="text"
                  required
                  value={newList.name}
                  onChange={e => setNewList({...newList, name: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data do Evento
                </label>
                <input
                  type="date"
                  required
                  value={newList.date}
                  onChange={e => setNewList({...newList, date: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={newList.description}
                  onChange={e => setNewList({...newList, description: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowNewListForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Criar Lista
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-4">Minhas Listas</h3>
            {lists.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhuma lista criada ainda.</p>
            ) : (
              <ul className="space-y-3">
                {lists.map(list => (
                  <li key={list.id}>
                    <button
                      onClick={() => setSelectedList(list.id)}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        selectedList === list.id
                          ? 'bg-red-50 text-red-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{list.name}</div>
                      <div className="text-sm text-gray-500">{list.date}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-3">
          {selectedList ? (
            <div className="bg-white rounded-lg shadow">
              {lists.map(list => {
                if (list.id === selectedList) {
                  return (
                    <div key={list.id}>
                      <div className="p-6 border-b">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-bold">{list.name}</h2>
                            <p className="text-gray-600">{list.description}</p>
                            <p className="text-sm text-gray-500 mt-1">Data: {list.date}</p>
                          </div>
                          <button
                            onClick={() => deleteList(list.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-semibold text-lg mb-4">Produtos na Lista</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {products.map(product => {
                            const isInList = list.items.includes(product.id);
                            return (
                              <div
                                key={product.id}
                                className="flex items-center gap-4 p-4 border rounded-lg"
                              >
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium">{product.title}</h4>
                                  <p className="text-red-600 font-semibold">
                                    R$ {product.price.toFixed(2)}
                                  </p>
                                </div>
                                <button
                                  onClick={() => isInList
                                    ? removeFromList(list.id, product.id)
                                    : addToList(list.id, product.id)
                                  }
                                  className={`p-2 rounded-full ${
                                    isInList
                                      ? 'bg-red-100 text-red-600'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  <Heart
                                    size={20}
                                    fill={isInList ? 'currentColor' : 'none'}
                                  />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <Heart size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecione uma lista
              </h3>
              <p className="text-gray-500">
                Escolha uma lista para ver e gerenciar seus produtos.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
    </>
  );
}