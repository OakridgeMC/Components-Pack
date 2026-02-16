import {
  system,
  world,
  ItemStack,
  CommandPermissionLevel,
  CustomCommandStatus,
  GameMode
} from "@minecraft/server";

// Spawners and budding amethyst drop when broken
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

// Sound effect when projectile makes contact
world.afterEvents.projectileHitEntity.subscribe((data) => {
  if (data.source?.typeId === "minecraft:player" && (data.projectile.typeId === "minecraft:arrow" || data.projectile.typeId === "minecraft:fireworks_rocket")) {
    data.source.playSound("random.orb", { volume: 0.4, pitch: 0.5 });
  }
});

// Held compass shows biome
system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const item = player.getComponent("equippable")?.getEquipment("Mainhand");
    if(item?.typeId !== "minecraft:compass") continue; //Skip this player if held item isn't compass. Self note: Continue means continue onto the next for(player).
    const dimension = player.dimension;
    const biome = dimension.getBiome(player.location);
    if (!biome) continue; // Skip this player if biome isn't loaded
    const match = JSON.stringify(biome).match(/"id":"([^"]*)"/);
    const biomeID = match ? match[1] : "Unknown";
    player.runCommand(`title @s actionbar Biome: §e${biomeID}`);
  }
}, 40);

// Custom Commands Below
const notifyOPs = (executor, feedback) => {
  for (const player of world.getPlayers()) {
    if (player.commandPermissionLevel > 0)
      player.sendMessage(`§7§o[${executor}: ${feedback}]§r`);
  }
};

system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
  customCommandRegistry.registerCommand(
    {
      name: "comp:tospawn",
      description: "Teleport to spawn at 0, 100, 0.",
      permissionLevel: CommandPermissionLevel.Any,
      cheatsRequired: false,
    },
    (origin) => {
      const cmdfeedback = "Teleporting to Spawn...";
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.teleport(
          { x: 0, y: 100, z: 0 },
          { dimension: world.getDimension("overworld") }
        );
        notifyOPs(origin.sourceEntity.name, `${cmdfeedback} (/tospawn)`);
      });
      return {
        status: CustomCommandStatus.Success,
        message: cmdfeedback,
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
      const cmdfeedback = "Gamemode has been set to Survival.";
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Survival);
        notifyOPs(origin.sourceEntity.name, `${cmdfeedback} (/survival)`);
      });
      return {
        status: CustomCommandStatus.Success,
        message: cmdfeedback,
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
      const cmdfeedback = "Gamemode has been set to Survival.";
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Survival);
        notifyOPs(origin.sourceEntity.name, `${cmdfeedback} (/gms)`);
      });
      return {
        status: CustomCommandStatus.Success,
        message: cmdfeedback,
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
      const cmdfeedback = "Gamemode has been set to Spectator.";
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Spectator);
        notifyOPs(origin.sourceEntity.name, `${cmdfeedback} (/spectator)`);
      });
      return {
        status: CustomCommandStatus.Success,
        message: cmdfeedback,
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
      const cmdfeedback = "Gamemode has been set to Spectator.";
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Spectator);
        notifyOPs(origin.sourceEntity.name, `${cmdfeedback} (/gmsp)`);
      });
      return {
        status: CustomCommandStatus.Success,
        message: cmdfeedback,
      };
    }
  );
  customCommandRegistry.registerCommand(
    {
      name: "comp:creative",
      description: "Sets gamemode to creative",
      permissionLevel: CommandPermissionLevel.GameDirectors,
      cheatsRequired: false,
    },
    (origin) => {
      const cmdfeedback = "Gamemode has been set to Creative.";
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Creative);
        notifyOPs(origin.sourceEntity.name, `${cmdfeedback} (/creative)`);
      });
      return {
        status: CustomCommandStatus.Success,
        message: cmdfeedback,
      };
    },
  );
  customCommandRegistry.registerCommand(
    {
      name: "comp:gmc",
      description: "Sets gamemode to creative",
      permissionLevel: CommandPermissionLevel.GameDirectors,
      cheatsRequired: false,
    },
    (origin) => {
      const cmdfeedback = "Gamemode has been set to Creative.";
      if (!origin.sourceEntity)
        return {
          status: CustomCommandStatus.Failure,
        };
      system.run(() => {
        origin.sourceEntity.setGameMode(GameMode.Creative);
        notifyOPs(origin.sourceEntity.name, `${cmdfeedback} (/gmc)`);
      });
      return {
        status: CustomCommandStatus.Success,
        message: cmdfeedback,
      };
    },
  );  
});