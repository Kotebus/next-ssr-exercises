'use client';
import React, {useEffect} from 'react';

import {getDataWithQuantity, IData} from './data';
import reducer, {ShopActions} from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow, {EmptyCheckoutFlow} from './CheckoutFlow';
import './styles.css';
import Spinner from "../../../components/Spinner";

const LOCAL_STORAGE_KEY = 'stored-items';
const data = getDataWithQuantity();

interface IStoredState {
    id: string;
    quantity: number;
}

const parseStoredItemsFromLocalStorage = (storedItemsData: string | null) => {
    if (storedItemsData === null) return [];

    const storedItems: IStoredState[] = JSON.parse(storedItemsData);
    return storedItems.map((item) => {
        const mappedItem = data.find(item => item.id === item.id);
        return {
            ...mappedItem,
            ...item,
        } as IData;
    });
}

type DispatcherType = (action: ShopActions) => void;

function CheckoutSection({isLoading, items, dispatch}: {
    isLoading: boolean,
    items: IData[],
    dispatch: DispatcherType,
}) {
    return (
        <>
            {isLoading && (
                <EmptyCheckoutFlow>
                    <p><Spinner/></p>
                </EmptyCheckoutFlow>)}

            {!isLoading && <CheckoutFlow
                items={items}
                taxRate={0.15}
                handleDeleteItem={(item) =>
                    dispatch({
                        type: 'delete-item',
                        item,
                    })
                }
            />}
        </>
    );
}

function ShopItemsSection({data, dispatch}: { data: IData[], dispatch: DispatcherType }) {
    console.log('shopitems')
    return (
        <div className="items">
            {data.map((item) => (
                <StoreItem
                    key={item.id}
                    item={item}
                    handleAddToCart={(item) => {
                        dispatch({
                            type: 'add-item',
                            item,
                        });
                    }}
                />
            ))}
        </div>
    );
}

function CheckoutExercise() {
    const [items, dispatch] = React.useReducer(reducer, []);
    const [isLoading, setIsLoading] = React.useState(true);

    //Initial data fetching from local storage
    useEffect(() => {
        const storedItemsData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedItemsData !== null) {
            const initialState = parseStoredItemsFromLocalStorage(storedItemsData);
            dispatch({type: 'set-initial-state', items: initialState});
        }
        setIsLoading(false);
    }, []);

    //Data update in local storage
    useEffect(() => {
        const storedItemsData = items.map((item) => {
            return {
                id: item.id,
                quantity: item.quantity,
            };
        });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedItemsData));
    }, [items]);

    return (
        <>
            <h1>Neighborhood Shop</h1>
            <main>
                <ShopItemsSection
                    data={data}
                    dispatch={dispatch}
                />
                <CheckoutSection
                    isLoading={isLoading}
                    items={items}
                    dispatch={dispatch}
                />
            </main>
        </>
    );
}

export default CheckoutExercise;
