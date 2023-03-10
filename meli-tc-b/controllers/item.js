const { fetchWrapper } = require("./utils");

exports.getItems = async (req, res) => {
  const nameFilter = req.query.q;
  if (nameFilter) {
    const { results, filters } = await fetchWrapper(
      `https://api.mercadolibre.com/sites/MLA/search?q=${nameFilter}`
    );
    const categories = filters[0]?.values[0]?.path_from_root;
    res.status(200).json({
      items: results.slice(0, 4),
      categories: categories ? categories.map((c) => c.name) : [],
    });
  }
};

exports.getItemDetails = (req, res) => {
  const itemId = req.params.id;

  Promise.all([
    fetchWrapper(`https://api.mercadolibre.com/items/${itemId}`),
    fetchWrapper(`https://api.mercadolibre.com/items/${itemId}/description`),
  ])
    .then(async ([item, description]) => {
      const categories = await fetchWrapper(
        `https://api.mercadolibre.com/categories/${item.category_id}`
      );
      item.description = description;
      item.categories = categories.path_from_root.map((p) => p.name);
      res.status(200).json(item);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.statusCode ?? 500).send(error);
    });
};
