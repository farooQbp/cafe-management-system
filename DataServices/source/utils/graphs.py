import matplotlib.pyplot as plt
from datetime import datetime
import os

def create_order_graphs(data, output_dir='graphs'):
    # Process the data
    item_quantities = {}
    date_prices = {}

    for order in data:
        # Aggregate item quantities
        for detail in order['orderDetails']:
            item = detail['item'].capitalize()
            quantity = detail['quantity']
            if item in item_quantities:
                item_quantities[item] += quantity
            else:
                item_quantities[item] = quantity

        # Aggregate date prices
        order_date = datetime.strptime(order['orderDateandTime'], "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%d-%m-%Y")
        price = order['price']
        if order_date in date_prices:
            date_prices[order_date] += price
        else:
            date_prices[order_date] = price

    # Create directory for saving graphs
    os.makedirs(output_dir, exist_ok=True)

    # Plot Items vs Quantity
    plt.figure(figsize=(10, 5))
    plt.bar(item_quantities.keys(), item_quantities.values(), color='skyblue')
    plt.xlabel('Items')
    plt.ylabel('Quantity')
    plt.title('Items vs Quantity')
    plt.savefig(os.path.join(output_dir, 'items_vs_quantity.png'))
    # plt.show()
    plt.close()

    # Plot Date vs Price
    plt.figure(figsize=(10, 5))
    plt.bar(date_prices.keys(), date_prices.values(), color='green')
    plt.xlabel('Date (DD-MM-YYYY)')
    plt.ylabel('Price')
    plt.title('Date vs Price')
    # plt.xticks(rotation=45)
    # plt.grid(True)
    plt.savefig(os.path.join(output_dir, 'date_vs_price.png'))
    # plt.show()
    plt.close()
    return { 'date_vs_price': 'graphs/date_vs_price.png', 'items_vs_quantity': 'graphs/items_vs_quantity.png' }