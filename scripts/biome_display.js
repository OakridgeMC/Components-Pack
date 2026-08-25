import { system, world } from "@minecraft/server";

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const item = player.getComponent("equippable")?.getEquipment("Mainhand");
    if (item?.typeId !== "minecraft:compass") continue;
    const dimension = player.dimension;
    const biome = dimension.getBiome(player.location);
    if (!biome) continue;
    const match = JSON.stringify(biome).match(/"id":"([^"]*)"/);
    const biomeID = match ? match[1] : "Unknown";
    player.onScreenDisplay.setActionBar(`Biome: §e${biomeID}`);
  }
}, 40);
