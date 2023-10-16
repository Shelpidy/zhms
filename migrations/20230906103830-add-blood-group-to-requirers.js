"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Requirers", "bloodGroupId", {
      type: Sequelize.UUID,
      references: {
        model: "BloodGroups", // Replace with the actual model name if needed
        key: "bloodGroupId", // Replace with the actual primary key of the BloodGroups table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Requirers", "bloodGroupId");
  },
};
