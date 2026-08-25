import { system, world, CommandPermissionLevel, CustomCommandStatus, GameMode } from "@minecraft/server";

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
