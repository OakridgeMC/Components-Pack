import { system, world } from "@minecraft/server";

const rideableMobs = [
  "minecraft:horse",
  "minecraft:donkey",
  "minecraft:mule",
  "minecraft:skeleton_horse",
  "minecraft:zombie_horse",
  "minecraft:pig",
  "minecraft:strider",
  "minecraft:camel",
  "minecraft:happy_ghast"
];

const speedFactor = 43.17;

system.runInterval(() => {
  for (const player of world.getPlayers()) {
    const item = player.getComponent("equippable")?.getEquipment("Mainhand");
    if (item?.typeId !== "minecraft:compass") continue;

    const mount = player.getComponent("minecraft:riding")?.entityRidingOn;
    if (!mount || !rideableMobs.includes(mount.typeId)) continue;
    const movement = mount.getComponent("minecraft:movement");
    const speedValue = (movement?.currentValue ?? 0) * speedFactor;
    player.onScreenDisplay.setActionBar(
      `${getSpeedColor(speedValue)}${speedValue.toFixed(2)} b/s`
    );
  }
}, 4);

function getSpeedColor(speed) {
  if (speed < 7) return "§c";
  if (speed < 9) return "§6";
  if (speed < 11) return "§e";
  if (speed < 13) return "§2";
  if (speed < 15) return "§a";
  return "§b";
}
