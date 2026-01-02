import * as mc from "@minecraft/server";
import {
  system,
  world,
  ItemStack,
  CommandPermissionLevel,
  CustomCommandStatus,
  GameMode
} from "@minecraft/server";

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

system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
  customCommandRegistry.registerCommand(
    {
      name: "comp:tospawn",
      description: "Teleport to spawn at 0, 100, 0.",
      permissionLevel: CommandPermissionLevel.Any,
      cheatsRequired: false,
    },
    (origin) => {
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.teleport(
          { x: 0, y: 100, z: 0 },
          { dimension: world.getDimension("overworld") }
        );
      });
      return {
        status: CustomCommandStatus.Success,
        message: "Teleporting to Spawn...",
      };
    }
  );
  customCommandRegistry.registerCommand(
    {
      name: "comp:survival",
      description: "Sets gamemode to survival",
      permissionLevel: CommandPermissionLevel.Any,
      cheatsRequired: false,
    },
    (origin) => {
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Survival);
      });
      return {
        status: CustomCommandStatus.Success,
        message: "Gamemode has been set to Survival.",
      };
    }
  );
  customCommandRegistry.registerCommand(
    {
      name: "comp:gms",
      description: "Sets gamemode to survival",
      permissionLevel: CommandPermissionLevel.Any,
      cheatsRequired: false,
    },
    (origin) => {
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Survival);
      });
      return {
        status: CustomCommandStatus.Success,
        message: "Gamemode has been set to Survival.",
      };
    }
  );
  customCommandRegistry.registerCommand(
    {
      name: "comp:spectator",
      description: "Sets gamemode to spectator",
      permissionLevel: CommandPermissionLevel.Any,
      cheatsRequired: false,
    },
    (origin) => {
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Spectator);
      });
      return {
        status: CustomCommandStatus.Success,
        message: "Gamemode has been set to Spectator.",
      };
    }
  );
  customCommandRegistry.registerCommand(
    {
      name: "comp:gmsp",
      description: "Sets gamemode to spectator",
      permissionLevel: CommandPermissionLevel.Any,
      cheatsRequired: false,
    },
    (origin) => {
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Spectator);
      });
      return {
        status: CustomCommandStatus.Success,
        message: "Gamemode has been set to Spectator.",
      };
    }
  );
});