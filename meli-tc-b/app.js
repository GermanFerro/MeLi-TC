const express = require("express");

const app = express();

app.get("/api/items/:id", async (req, res) => {
  const itemId = req.params.id;
  const itemResponse = await fetch(
    `https://api.mercadolibre.com/items/${itemId}`
  );
  const itemDescription = await fetch(
    `https://api.mercadolibre.com/items/${itemId}/description`
  );
  if (!itemResponse.ok || !itemDescription.ok) {
    throw new Error("Error response");
  }
  const item = await itemResponse.json();
  const description = await itemDescription.json();
  item.description = description;
  const itemCategories = await fetch(
    `https://api.mercadolibre.com/categories/${item.category_id}`
  );
  if (!itemCategories) {
    throw new Error("Error response");
  }
  const categories = await itemCategories.json();
  item.categories = categories.path_from_root.map((p) => p.name);

  res.send(item);
});

app.get("/api/items", async (req, res) => {
  const nameFilter = req.query.q;
  if (nameFilter) {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${nameFilter}`
    );
    if (!response.ok) {
      throw new Error("Resource not found");
    }
    const items = await response.json();
    res.send(items);
  }
});

app.listen(4000);
