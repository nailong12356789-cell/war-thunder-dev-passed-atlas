# Data quality snapshot / 数据质量快照

**Snapshot:** 2026-10-22 · **Scope:** published `data/vehicles.json`, **not** an independent re-verification of every War Thunder forum entry.

## Counts

| Metric | Records |
| --- | ---: |
| Total candidate entries | 1184 |
| Ground | 551 |
| Air | 527 |
| Helicopters | 106 |
| Pending verification (`status=pending`) | 596 |
| Missing `month` in local dataset | 29 |
| Exact-title duplicate groups (same nation and type) | 1 |

The Chinese Jaguar MBT pair was merged into `v0262`. The 2021-02 source is preserved under `related_suggestions`, with the 2025-07 main entry retained. The US entry is independent in the dataset pending further evidence.

## Suspected duplicate titles (not automatically removable)

- `h393518` — **Panhard EBR** (法国, G, 2019-01): [original suggestion](https://forum.warthunder.com/index.php?/topic/393518-panhard-ebr-all-variants/)
- `h330690` — **Panhard EBR** (法国, G, 2019-12): [original suggestion](https://forum.warthunder.com/index.php?/topic/330690-panhard-ebr-wheeled-reconnaissance-vehicle/)

Tracked in [Issue #4](https://github.com/nailong12356789-cell/war-thunder-dev-passed-atlas/issues/4). Two different original suggestions can describe different variants; title equality is a warning, **not proof of duplication**.

## Missing transfer months in local data (29)

These entries do not have a verified `month` field yet. This is a **data completeness issue**, not evidence they never passed to the developers. Find the original monthly report before assigning a date.

| ID | Candidate vehicle | Group | Original suggestion |
| --- | --- | --- | --- |
| `hru18767` | Object 277（277工程） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/obekt-277-po-krasote-i-po-poryadku/18767) |
| `hki106` | Tachikawa Ki-106（旧提案，原型编号待核实） | 日本 | [source](https://old-forum.warthunder.com/index.php?/topic/456261-tachikawa-ki-106-experimental-fighter-wooden-frank/) |
| `hru21411` | Type 97 Shi-Ki（九七式指挥坦克） | 日本 | [source](https://forum.warthunder.ru/t/type-97-shi-ki-dlya-yaponii/21411) |
| `ru109020` | Polikarpov I-17（具体原型待核实） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/i-17-v-vetke-sovetskoj-aviaczii/109020) |
| `ru108656` | M4A3E4 Sherman（丹麦） | 其他国家 | [source](https://forum.warthunder.ru/t/m4a3e4-sherman-daniya/108656) |
| `ru108546` | Kamov A-7（武装自转旋翼机） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/avtozhir-a-7-po-nastoyashhemu-analogovnet/108546) |
| `ru108242` | T-34/122（埃及） | 其他国家 | [source](https://forum.warthunder.ru/t/t-34-122-egipet/108242) |
| `ru108147` | Yakovlev Yak-3T-57 | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/yak-3t-57/108147) |
| `ru107912` | McDonnell Douglas T-45 Goshawk（武装提案） | 美国 | [source](https://forum.warthunder.ru/t/predlozhenie-mcdonnell-douglas-t-45-goshawk-legkij-palubnyj-shturmovik-vms-ssha/107912) |
| `ru104687` | Vickers Mk.4（Early，105mm） | 英国 | [source](https://forum.warthunder.ru/t/vickers-mk-4-early/104687) |
| `ru103952` | BMP-3 B-19（Epokha） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/bmp-3-b-19-s-boevym-modulem-epoha/103952) |
| `ru105758` | T-64 / T-64R（115mm D-68提案） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/gadkij-utenok-t-64-v-t-ch-t-64r/105758) |
| `ru104176` | KV-220（KV-1炮塔／76.2mm） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/dobavlenie-kv-220-s-serijnoj-bashnej-ot-kv-1-s-pushkoj-zis-5-f-32/104176) |
| `ru105880` | Antonov An-72P | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/dobavit-v-igru-samolyot-an-72p/105880) |
| `ru103871` | 10TP（波兰） | 其他国家 | [source](https://forum.warthunder.ru/t/10tp-i-rang-italiya-francziya/103871) |
| `ru105827` | T-45（苏联轻型坦克） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/rasshirenie-vetki-legkih-tankov-sssr-t-45/105827) |
| `ru103745` | Matilda Mk.II（意大利缴获型） | 意大利 | [source](https://forum.warthunder.ru/t/novyj-tt-dlya-italii-na-srednih-rangov-trofejnaya-italyanskaya-matilda/103745) |
| `ru104131` | Sukhoi S-22I / Su-7IG | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/s-22i-su-7ig-dobavit-v-igru/104131) |
| `ru103953` | BMP-2 B-18（Epokha） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/bmp-2-s-epohoj-b-18/103953) |
| `ru103744` | Sukhoi Su-15（1949年原型） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/su-15-1949-v-igru/103744) |
| `ru103686` | BTR-80UM Rogan（乌克兰） | 其他国家 | [source](https://forum.warthunder.ru/t/btr-80um-rogan/103686) |
| `ru103501` | Dassault Rafale EI（印度尼西亚） | 日本 | [source](https://forum.warthunder.ru/t/indonezijskij-rafale-v-yaponiyu/103501) |
| `ru103440` | Kung Feng VI（工蜂六型） | 中国 | [source](https://forum.warthunder.ru/t/kung-feng-vi-rszo/103440) |
| `ru100996` | BPM-97 Vystrel（BM-30 Spitsa） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/bystryj-i-skorostrelnyj-bpm-97/100996) |
| `ru102194` | Mikoyan Ye-8 / E-8（原型） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/istrebitel-e-8/102194) |
| `ru101906` | Sisu XA-185（Delco 25mm） | 瑞典 | [source](https://forum.warthunder.ru/t/bmp-ha-185-s-25-mm-pushkoj-shvecziya/101906) |
| `ru101457` | YPR-765 PRI（25mm，荷兰） | 法国 | [source](https://forum.warthunder.ru/t/ypr-765-francziya-6-rang/101457) |
| `ru98988` | Mikoyan MiG-17PF（苏联） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/rasshirenie-linejki-mig-17-v-vetke-sssr-i-vvedenie-modifikaczij/98988) |
| `ru99224` | T-90（1942年防空原型） | 苏联／俄罗斯 | [source](https://forum.warthunder.ru/t/t-90-da-ne-tot/99224) |

## Review policy

1. Verify exact variant/configuration and both source threads before merging duplicates; preserve historical passed dates in `related_suggestions`.
2. Verify transfer months against official monthly-report lists or reliable archives; do **not** substitute suggestion posting dates for transfer dates.
3. Remove an already-implemented vehicle only after comparing the exact game configuration, including event/premium/hidden vehicles.
4. Keep RB values marked as non-official estimates.
5. After edits, run `python scripts/validate_atlas.py` and ensure GitHub Actions passes. Keep embedded JSON, static catalog and visible counters synchronized.

Current cross-file correctness is checked automatically, but **historical claims, rights to photos, and individual vehicle configurations still require manual evidence.**
