<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderProduct;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Almacenar una orden
        $order = new Order;
        $order->user_id = Auth::user()->id;
        $order->total = $request->total;
        $order->save();


        // Obtener el ID del pedido
        $id = $order->id;

        // Obtener los productos
        $products = $request->products;

        // Formatear un arreglo
        $order_product = [];

        foreach($products as $product){
            $order_product[] = [
                'order_id' => $id,
                'product_id' => $product['id'],
                'amount' => $product['amount'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ];
        }

        // Almacenar en la BD
        OrderProduct::insert($order_product);

        return [
            'message' => 'Pedido Realizado correctamente, estará listo en unos minutos' 
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
