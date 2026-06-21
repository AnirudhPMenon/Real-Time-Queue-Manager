(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/useSocket.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSocket",
    ()=>useSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const useSocket = (clinicId)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "e9152c783d35c1184ac611dc9cb216c040c9f298fa7cb08b05f83a8220538065") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e9152c783d35c1184ac611dc9cb216c040c9f298fa7cb08b05f83a8220538065";
    }
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            currentlyServing: null,
            activeRoom: null,
            tokensAheadCount: 0,
            rollingAverageTime: 15,
            waitingList: [],
            completedList: [],
            activeList: []
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [queueState, setQueueState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    let t1;
    let t2;
    if ($[2] !== clinicId) {
        t1 = ()=>{
            fetch(`http://localhost:5000/api/queue/state/${clinicId}`).then(_temp).then((data)=>{
                if (data.success) {
                    console.log("\u2705 [HTTP] Initial State Loaded:", data);
                    setQueueState({
                        currentlyServing: data.currentlyServing,
                        activeRoom: data.activeRoom,
                        tokensAheadCount: data.tokensAheadCount,
                        rollingAverageTime: data.rollingAverageTime,
                        waitingList: data.waitingList || [],
                        completedList: data.completedList || [],
                        activeList: data.activeList || []
                    });
                }
            }).catch(_temp2);
            if (!socketRef.current) {
                socketRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])("http://localhost:5000", {
                    transports: [
                        "websocket"
                    ],
                    autoConnect: true
                });
            }
            const socket = socketRef.current;
            const onConnect = ()=>{
                console.log("\uD83D\uDFE2 [SOCKET] Connected ID:", socket.id);
                socket.emit("join_clinic_room", {
                    clinicId
                });
            };
            const onQueueMutated = (data_0)=>{
                console.log("\uD83D\uDD25 [SOCKET] LIVE SYNC PAYLOAD:", data_0);
                setQueueState((prev)=>({
                        ...prev,
                        currentlyServing: data_0.currentlyServing || prev.currentlyServing,
                        activeRoom: data_0.activeRoom || prev.activeRoom,
                        tokensAheadCount: data_0.tokensAheadCount ?? prev.tokensAheadCount,
                        rollingAverageTime: data_0.rollingAverageTime || prev.rollingAverageTime,
                        waitingList: data_0.waitingList || prev.waitingList,
                        completedList: data_0.completedList || prev.completedList,
                        activeList: data_0.activeList || prev.activeList
                    }));
            };
            socket.on("connect", onConnect);
            socket.on("queue_mutated", onQueueMutated);
            if (socket.connected) {
                socket.emit("join_clinic_room", {
                    clinicId
                });
            }
            return ()=>{
                socket.off("connect", onConnect);
                socket.off("queue_mutated", onQueueMutated);
                socket.disconnect();
                socketRef.current = null;
            };
        };
        t2 = [
            clinicId
        ];
        $[2] = clinicId;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    if ($[5] !== queueState) {
        t3 = {
            queueState
        };
        $[5] = queueState;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    return t3;
};
_s(useSocket, "F7GF7mPzLwItPxDjmBzO8aTny1U=");
function _temp(res) {
    return res.json();
}
function _temp2(err) {
    return console.error("Failed to fetch initial queue state", err);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/tv/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PublicTvScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSocket.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.mjs [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.mjs [app-client] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/door-open.mjs [app-client] (ecmascript) <export default as DoorOpen>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PublicTvScreen() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "0cc83a386e094b522ab82a7427f79c5e590107ee35373e09e1f20bf5a1103052") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0cc83a386e094b522ab82a7427f79c5e590107ee35373e09e1f20bf5a1103052";
    }
    const { queueState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])("clinic_123");
    const [lastCalled, setLastCalled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t0;
    let t1;
    if ($[1] !== lastCalled || $[2] !== queueState.currentlyServing) {
        t0 = ({
            "PublicTvScreen[useEffect()]": ()=>{
                if (queueState.currentlyServing && queueState.currentlyServing !== lastCalled) {
                    setLastCalled(queueState.currentlyServing);
                }
            }
        })["PublicTvScreen[useEffect()]"];
        t1 = [
            queueState.currentlyServing,
            lastCalled
        ];
        $[1] = lastCalled;
        $[2] = queueState.currentlyServing;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"], {
                    className: "text-blue-400",
                    size: 32
                }, void 0, false, {
                    fileName: "[project]/src/app/tv/page.jsx",
                    lineNumber: 41,
                    columnNumber: 51
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold tracking-tight text-white",
                    children: "City Care Clinic"
                }, void 0, false, {
                    fileName: "[project]/src/app/tv/page.jsx",
                    lineNumber: 41,
                    columnNumber: 98
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 41,
            columnNumber: 10
        }, this);
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "bg-slate-800/50 border-b border-slate-700 p-6 flex justify-between items-center shadow-lg z-10",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-emerald-400 font-bold tracking-widest uppercase bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative flex h-3 w-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tv/page.jsx",
                                    lineNumber: 48,
                                    columnNumber: 333
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tv/page.jsx",
                                    lineNumber: 48,
                                    columnNumber: 440
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tv/page.jsx",
                            lineNumber: 48,
                            columnNumber: 293
                        }, this),
                        "Live Queue"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tv/page.jsx",
                    lineNumber: 48,
                    columnNumber: 129
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 48,
            columnNumber: 10
        }, this);
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-0 right-0 p-12 opacity-5",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                size: 250
            }, void 0, false, {
                fileName: "[project]/src/app/tv/page.jsx",
                lineNumber: 55,
                columnNumber: 65
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 55,
            columnNumber: 10
        }, this);
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-4xl font-semibold text-blue-200 mb-8 uppercase tracking-widest border-b border-blue-400/30 pb-6 z-10 flex items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$door$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DoorOpen$3e$__["DoorOpen"], {
                    size: 40
                }, void 0, false, {
                    fileName: "[project]/src/app/tv/page.jsx",
                    lineNumber: 62,
                    columnNumber: 156
                }, this),
                " Please Proceed To"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== queueState.activeList) {
        t6 = !queueState.activeList || queueState.activeList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center text-blue-200/50 text-4xl font-medium italic",
            children: "Waiting for doctors..."
        }, void 0, false, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 69,
            columnNumber: 73
        }, this) : queueState.activeList.map(_PublicTvScreenQueueStateActiveListMap);
        $[9] = queueState.activeList;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col bg-gradient-to-b from-blue-600 to-indigo-900 rounded-[3rem] shadow-2xl border border-blue-400/30 p-10 relative overflow-hidden",
            children: [
                t4,
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col gap-6 z-10 justify-center",
                    children: t6
                }, void 0, false, {
                    fileName: "[project]/src/app/tv/page.jsx",
                    lineNumber: 77,
                    columnNumber: 176
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 77,
            columnNumber: 10
        }, this);
        $[11] = t6;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-3xl font-semibold text-slate-300 mb-8 flex items-center gap-3 border-b border-slate-700 pb-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                    className: "text-indigo-400"
                }, void 0, false, {
                    fileName: "[project]/src/app/tv/page.jsx",
                    lineNumber: 85,
                    columnNumber: 124
                }, this),
                " Up Next To Be Called"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 85,
            columnNumber: 10
        }, this);
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t10;
    let t9;
    if ($[14] !== queueState.waitingList) {
        t9 = queueState.waitingList?.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex items-center justify-center text-2xl text-slate-500 italic",
            children: "No patients waiting."
        }, void 0, false, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 93,
            columnNumber: 49
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-6 overflow-hidden",
            children: queueState.waitingList?.slice(0, 5).map(_PublicTvScreenAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 93,
            columnNumber: 166
        }, this);
        t10 = queueState.waitingList?.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 text-center text-slate-400 text-xl font-medium",
            children: [
                "+ ",
                queueState.waitingList.length - 5,
                " more patients waiting"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 94,
            columnNumber: 49
        }, this);
        $[14] = queueState.waitingList;
        $[15] = t10;
        $[16] = t9;
    } else {
        t10 = $[15];
        t9 = $[16];
    }
    let t11;
    if ($[17] !== t10 || $[18] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col bg-slate-800/40 rounded-[3rem] p-10 border border-slate-700 shadow-xl",
            children: [
                t8,
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 104,
            columnNumber: 11
        }, this);
        $[17] = t10;
        $[18] = t9;
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== t11 || $[21] !== t7) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 grid grid-cols-1 lg:grid-cols-2 p-8 gap-12",
                    children: [
                        t7,
                        t11
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tv/page.jsx",
                    lineNumber: 113,
                    columnNumber: 113
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/tv/page.jsx",
            lineNumber: 113,
            columnNumber: 11
        }, this);
        $[20] = t11;
        $[21] = t7;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    return t12;
}
_s(PublicTvScreen, "Lsox+Q66bLa0emi0FETnT/R87Mw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = PublicTvScreen;
function _PublicTvScreenAnonymous(patient_0, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-800 border border-slate-600/50 p-6 rounded-3xl flex justify-between items-center shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-700 text-slate-300 text-2xl font-bold h-14 w-14 rounded-full flex items-center justify-center",
                        children: index + 1
                    }, void 0, false, {
                        fileName: "[project]/src/app/tv/page.jsx",
                        lineNumber: 123,
                        columnNumber: 196
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-3xl font-medium text-white",
                        children: patient_0.patientName
                    }, void 0, false, {
                        fileName: "[project]/src/app/tv/page.jsx",
                        lineNumber: 123,
                        columnNumber: 333
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tv/page.jsx",
                lineNumber: 123,
                columnNumber: 155
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-indigo-400 font-black text-5xl",
                children: [
                    "#",
                    patient_0.tokenNumber
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tv/page.jsx",
                lineNumber: 123,
                columnNumber: 419
            }, this)
        ]
    }, patient_0.tokenNumber, true, {
        fileName: "[project]/src/app/tv/page.jsx",
        lineNumber: 123,
        columnNumber: 10
    }, this);
}
function _PublicTvScreenQueueStateActiveListMap(patient) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex justify-between items-center shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl font-bold text-blue-300 uppercase tracking-widest bg-blue-900/50 inline-block px-4 py-1 rounded-xl w-fit",
                        children: patient.assignedRoom
                    }, void 0, false, {
                        fileName: "[project]/src/app/tv/page.jsx",
                        lineNumber: 126,
                        columnNumber: 257
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-5xl font-bold text-white tracking-tight",
                        children: patient.patientName
                    }, void 0, false, {
                        fileName: "[project]/src/app/tv/page.jsx",
                        lineNumber: 126,
                        columnNumber: 418
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tv/page.jsx",
                lineNumber: 126,
                columnNumber: 220
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-8xl font-black text-white drop-shadow-2xl",
                children: [
                    "#",
                    patient.tokenNumber
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tv/page.jsx",
                lineNumber: 126,
                columnNumber: 515
            }, this)
        ]
    }, patient.tokenNumber, true, {
        fileName: "[project]/src/app/tv/page.jsx",
        lineNumber: 126,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "PublicTvScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0eq7z7-._.js.map