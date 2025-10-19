import * as mc from "@minecraft/server";
import { system, world, ItemStack } from "@minecraft/server";

mc.world.beforeEvents.playerBreakBlock.subscribe((data) => {
  const block = data.block;
  const blockId = block.permutation.type.id;
  let itemToDrop;
  if (blockId == "minecraft:mob_spawner") {
    itemToDrop = new ItemStack("minecraft:mob_spawner", 1);
  } else if (blockId == "minecraft:budding_amethyst") {
    itemToDrop = new ItemStack("minecraft:budding_amethyst", 1);
  } else {
    return;
  }
  mc.system.run(() => {
    block.dimension.spawnItem(itemToDrop, block.location);
  });
});

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const item = player.getComponent("equippable").getEquipment("Mainhand");
    const dimension = player.dimension;
    const biome = dimension.getBiome(player.location);
    const biomeID = JSON.stringify(biome).match(/"id":"([^"]*)"/)[1];
    item.typeId == "minecraft:compass" &&
      player.runCommand(`title @s actionbar Biome: §e${biomeID}`);
  }
}, 40);