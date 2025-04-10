import menuSchema from "./models/menuSchema.js";
import express from "express";
import menuItem from "./models/menuItemSchema.js";

export async function createmenu(req, res) {
  try {
    const { menuname, description } = req.body;

    if (!menuname || !description) {
      return res.status(400).send({ message: "Menuname and description are required." });
    }

    const existingMenu = await menuSchema.findOne({ name: menuname });
    if (existingMenu) {
      return res.status(400).send({ message: "A menu with this name already exists." });
    }

    const newMenu = await menuSchema.create({ name: menuname, description: description });

    res.status(201).send({ message: "Menu created successfully!", menu: newMenu });
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).send({ message: "An error occurred while creating the menu.", error });
  }
}

export async function getAllMenus(req, res) {
  try {
    const menus = await menuSchema.find();

    res.status(200).send({ menus });
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).send({ message: "An error occurred while fetching the menus.", error });
  }
}

export async function createMenuItem(req, res) {
  try {
    const { menuId, name, description, price } = req.body;

    if (!menuId || !name || !description || !price) {
      return res.status(400).send({ message: "All fields are required (menuId, name, description, price)." });
    }

    const menu = await menuSchema.findById(menuId);
    if (!menu) {
      return res.status(500).json({ message: "Menu not found for the given menuId." });
    }

    const newMenuItem = await menuItem.create({
      menuId,
      name,
      description,
      price: parseFloat(price),
    });

    res.status(201).send({ message: "Menu item created successfully!", menuItem: newMenuItem });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).send({ message: "An error occurred while creating the menu item." });
  }
}

export async function getmenuitem(req, res) {
  try {
    const { id } = req.params;

    const menu = await menuSchema.findById(id);
    if (!menu) {
      return res.status(500).send({ message: "Menu not found." });
    }

    const menuItems = await menuItem.find({ menuId: id });

    res.status(200).send({ menuName: menu.name, menuItems });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).send({ message: "An error occurred while fetching the menu items.", error });
  }
}

export async function deletemenu(req, res) {
  try {
    const { id } = req.params;

    const menu = await menuSchema.findById(id);
    if (!menu) {
      return res.status(500).send({ message: "Menu not found." });
    }
    await menuSchema.findByIdAndDelete(id);
    await menuItem.deleteMany({ menuId: id });

    res.status(200).send({ message: "Menu and associated menu items deleted successfully!" });
  } catch (error) {
    console.error("Error deleting menu and menu items:", error);
    res.status(500).send({ message: "An error occurred while deleting the menu and menu items.", error });
  }
}

export async function deletemenuitem(req, res) {
  try {
    const { id } = req.params;

    const menuItemdlt = await menuItem.findById(id);
    if (!menuItemdlt) {
      return res.status(500).send({ message: "Menu item not found." });
    }
    await menuItem.findByIdAndDelete(id);

    res.status(200).send({ message: "Menu item deleted successfully!" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).send({ message: "An error occurred while deleting the menu item.", error });
  }
}

export async function edititems(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    if (!name && !description && !price) {
      return res.status(400).send({
        message: "At least one field (name, description, price) must be provided for update.",
      });
    }

    const menuItemToUpdate = await menuItem.findById(id);
    if (!menuItemToUpdate) {
      return res.status(500).send({ message: "Menu item not found." });
    }

    if (name) menuItemToUpdate.name = name;
    if (description) menuItemToUpdate.description = description;
    if (price) menuItemToUpdate.price = parseFloat(price);

    const updatedMenuItem = await menuItemToUpdate.save();

    res.status(200).send({ message: "Menu item updated successfully!", menuItem: updatedMenuItem });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).send({ message: "An error occurred while updating the menu item.", error });
  }
}