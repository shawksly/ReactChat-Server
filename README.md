# Upright Unit 6 - Chat Server

#### URL: N/A -- Server Code

## Status === Complete

## Languages

JavaScript, HTML, CSS

## Pseudocode
This website uses [Fake Store API](https://fakestoreapi.com/) and [Bootstrap v5.3.1](https://getbootstrap.com/) to generate a store where users can switch items displayed, add them to cart in multiple quantities, purchase, and clear their carts.

#### Flow / Description
##### html
1. import css from bootstrap, and my own
2. body - flexbox, centered
    1. modal - for cart when cart button clicked
        1. close button at top
        2. item table - to be populated with items in the cart
        3. price table - to be updated with prices from cart items
        4. clear cart button - zeroes cart out and resets modal
        5. purchase button - clears cart, resets modal and displays thank you alert
    2. navbar
        1. brand button - home button - displays all items
        2. categories - display each specific category
            1. electronics
            2. jewelery
            3. men's clothes
            4. women's clothes
        3. cart button - shows cart modal
    3. display div - main code, displays item cards generated with JS
    4. footer - stretches screen and displays copyright
    5. import bootstrap js and my main.js
##### javascript
1. declarations
    1. navbar link elements
    2. navbar cart button
    3. modal item table body
    4. modal price table
    5. modal price elements (total, subtotal, tax, etc.)
    6. modal clear cart button
    7. modal purchase button
    8. display div - main content area
    9. endpoint url
    10. cart array
2. functions
    1. capitalize() - returns capitalized word
    2. priceFormat() - returns number in $0.00 format
    3. submitToCart() - add object to cart array, or increases its quantity
    4. displayCart() - updates information on the modal when the cart button is clicked
        1. sets values to 0
        2. if cart isn't empty - updates and creates rows, iterating through each item
        3. displays data whether empty or not
    5. clearCart() - clears cart array and disables buttons after purchase or with clear cart button
    6. accordionItem() - creates accordion items within each item card - called during displayCards() function
    7. displayCards() - takes data from fetch into a forEach loop, and creates, edits and appends a new card to the display div for each of them
        1. item image from api
        2. item title from api
        3. item description from api in accordion
        4. item price from api in accordion
        5. footer with add to cart button - button creates aboject that's added to cart with submitToCart()
    8. fakeStore() - creates a spinner (cleared in displayCards()), fetches data from the api, based on passed value, and uses displayCards() to show it
    9. setActiveLink() - removes active attribute from nav links, and adds it to the clicked link - runs in nav event listeners
3. event listeners
    1. cart and modal buttons
        1. nav cart button - runs displayCart()
        2. modal clear cart button - runs clearCart() and displayCart()
        3. modal purchase button - runs clearCart() and displayCart() and creates an alert before the modal price table
    2. nav buttons - run setActiveLink() and fakeStore() for their respective categories
    3. onload - runs fakeStore() for all items