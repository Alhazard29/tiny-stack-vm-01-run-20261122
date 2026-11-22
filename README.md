# tiny-stack-vm

A tiny stack virtual machine for make.fun's tiny-stack-vm-01 ISA (v1):
32-bit wrapping integers, a 256-value data stack, a 64-deep call stack,
256 words of memory, input/output, and ten traps with their own exit
codes. One run of `node main.ts` answers all 40 instances in a set,
reading `/input/<id>/program.bin` + `input.bin` and writing
`/output/<id>/stdout.bin` + `exit.txt` for each.

Written from `ISA.md` only. Node 22, no dependencies, no network,
no clock, fully deterministic.
