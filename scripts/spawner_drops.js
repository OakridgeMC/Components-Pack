import { system, world, ItemStack } from "@minecraft/server";

world.beforeEvents.playerBreakBlock.subscribe((data) => {
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
  system.run(() => {
    block.dimension.spawnItem(itemToDrop, block.location);
  });
});
