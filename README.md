# Overview

This project is a simple storefront page with 5 sample products. You can select a quantity for each product and add them to your cart. The cart page shows the details of the products added and the cost of the purchase. After adding valid but fictional payment information, the purchase will be accepted, and you'll be returned to the storefront. You can either reach the website through this link: (https://logan-school.github.io/Shop-Website/), or you can set up a test server by having all the files (the README is optional) in VS Code and using the Live Server extension by Ritwick Dey, then right-clicking the .HTML file and selecting Open with Live Server. 

The purpose of making this project was to learn how to use React and to improve my ability to make well-structured and functional websites. This can help me in the future with making better websites and using all the tools available to me.

[Software Demo Video](https://youtu.be/m4l_uBtv-6E)

# Web Pages

The first and main page that the website goes to is the storefront page. The product cards are created and added based on how many products I've created, and it's easy to add new ones or change the old ones. Each card is created with a selector for quantity and an add-to-cart button, which stores the quantity and product type for calculation in the purchase later. By clicking the cart button, you're moved to the cart page. You can always return to the storefront page by clicking on the top-left shop name or the return to shop button underneath it. The cart page has a display on the left that generates and shows all the items and their quantities that you selected earlier. You can change the quantities and remove items on this page, and the purchase cost (which changes when the products do) is shown at the bottom. The Complete Order button triggers messages guiding you through inputting the payment information until it's all valid, at which point it takes you to a stationary page that says the purchase was accepted and you can return to the storefront page.

# Development Environment

For this project, I used ChatGPT to understand how React works and work through the syntax. I also used the official React link given in the module details to learn how to use React. I also used a tutorial from w3schools.

The languages I used are JavaScript, HTML, and CSS. The libraries I used are React, ReactDOM, and Babel to help convert the .jsx file into a format that the browser can use.

# Useful Websites

* [Web Site Name](https://react.dev/learn)
* [Web Site Name](https://www.w3schools.com/react/)

# Future Work

* I would like to add a list of countries you could select from that would alter the shipping. I guess it would be limited to a few countries unless there's a public library of countries that details distance from the US.
* I would like to add a weight modifier to the products that would change the shipping based on quantity and weight unless the purchase meets a price threshold.
* I would like to add a tax modifier to the price that changes based on which country you selected. The tax would be calculated at checkout.
