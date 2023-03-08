exports.getItems = async (req, res) => {
  const nameFilter = req.query.q;
  if (nameFilter) {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${nameFilter}`
    );
    if (!response.ok) {
      throw new Error("Resource not found");
    }
    const { results, filters } = await response.json();
    const categories = filters[0]?.values[0]?.path_from_root;
    res.status(200).json({
      items: results.slice(0, 4),
      categories: categories ? categories.map((c) => c.name) : [],
    });
  }
};

exports.getItemDetails = async (req, res) => {
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

  res.status(200).json(item);
};
