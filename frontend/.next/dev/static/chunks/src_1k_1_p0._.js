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
"[project]/src/app/track/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PatientTrackingScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSocket.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PatientTrackingScreen() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(50);
    if ($[0] !== "9dae6d339aca50c2724f6e7a508ecb7a9fc90ed8082d43d6a1275478c1835461") {
        for(let $i = 0; $i < 50; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9dae6d339aca50c2724f6e7a508ecb7a9fc90ed8082d43d6a1275478c1835461";
    }
    const { queueState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])("clinic_123");
    const [myToken, setMyToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCheckingURL, setIsCheckingURL] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [manualInput, setManualInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "PatientTrackingScreen[useEffect()]": ()=>{
                const params = new URLSearchParams(window.location.search);
                const urlCode = params.get("code");
                if (urlCode) {
                    fetch(`http://localhost:5000/api/queue/verify/${urlCode}`).then(_PatientTrackingScreenUseEffectAnonymous).then({
                        "PatientTrackingScreen[useEffect() > (anonymous)()]": (data)=>{
                            if (data.success) {
                                setMyToken(data.tokenNumber);
                            }
                            setIsCheckingURL(false);
                        }
                    }["PatientTrackingScreen[useEffect() > (anonymous)()]"]).catch({
                        "PatientTrackingScreen[useEffect() > (anonymous)()]": ()=>setIsCheckingURL(false)
                    }["PatientTrackingScreen[useEffect() > (anonymous)()]"]);
                } else {
                    setIsCheckingURL(false);
                }
            }
        })["PatientTrackingScreen[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[3] !== manualInput) {
        t2 = ({
            "PatientTrackingScreen[handleManualSubmit]": async (e)=>{
                e.preventDefault();
                setErrorMessage("");
                if (!manualInput.trim()) {
                    return;
                }
                const cleanCode = manualInput.trim().toLowerCase();
                ;
                try {
                    const res_0 = await fetch(`http://localhost:5000/api/queue/verify/${cleanCode}`);
                    const data_0 = await res_0.json();
                    if (data_0.success) {
                        setMyToken(data_0.tokenNumber);
                        window.history.pushState({}, "", `?code=${cleanCode}`);
                    } else {
                        setErrorMessage("Invalid Access Code. Please check your SMS and try again.");
                    }
                } catch (t3) {
                    setErrorMessage("Connection error. Please ensure the server is running.");
                }
            }
        })["PatientTrackingScreen[handleManualSubmit]"];
        $[3] = manualInput;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const handleManualSubmit = t2;
    if (isCheckingURL) {
        let t3;
        if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-slate-100 flex items-center justify-center text-slate-500 font-medium",
                children: "Loading your ticket..."
            }, void 0, false, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 87,
                columnNumber: 12
            }, this);
            $[5] = t3;
        } else {
            t3 = $[5];
        }
        return t3;
    }
    if (myToken === null) {
        let t3;
        if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 p-6 opacity-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                    size: 100
                }, void 0, false, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 97,
                    columnNumber: 66
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 97,
                columnNumber: 12
            }, this);
            $[6] = t3;
        } else {
            t3 = $[6];
        }
        let t4;
        let t5;
        let t6;
        if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-indigo-100 text-indigo-600 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                    size: 32
                }, void 0, false, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 106,
                    columnNumber: 140
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 106,
                columnNumber: 12
            }, this);
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold text-slate-800 mb-2 tracking-tight",
                children: "Track Your Queue"
            }, void 0, false, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 107,
                columnNumber: 12
            }, this);
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-slate-500 text-sm mb-6",
                children: "Enter your secure access code below to view your live estimated wait time."
            }, void 0, false, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 108,
                columnNumber: 12
            }, this);
            $[7] = t4;
            $[8] = t5;
            $[9] = t6;
        } else {
            t4 = $[7];
            t5 = $[8];
            t6 = $[9];
        }
        let t7;
        if ($[10] !== errorMessage) {
            t7 = errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2 text-left animate-in fade-in slide-in-from-top-2 duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        size: 18,
                        className: "shrink-0 mt-0.5 text-red-500"
                    }, void 0, false, {
                        fileName: "[project]/src/app/track/page.jsx",
                        lineNumber: 119,
                        columnNumber: 216
                    }, this),
                    errorMessage
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 119,
                columnNumber: 28
            }, this);
            $[10] = errorMessage;
            $[11] = t7;
        } else {
            t7 = $[11];
        }
        let t8;
        if ($[12] !== errorMessage) {
            t8 = ({
                "PatientTrackingScreen[<input>.onChange]": (e_0)=>{
                    setManualInput(e_0.target.value);
                    if (errorMessage) {
                        setErrorMessage("");
                    }
                }
            })["PatientTrackingScreen[<input>.onChange]"];
            $[12] = errorMessage;
            $[13] = t8;
        } else {
            t8 = $[13];
        }
        const t9 = `w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all text-center text-xl font-bold text-slate-800 tracking-widest uppercase ${errorMessage ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-indigo-500"}`;
        let t10;
        if ($[14] !== manualInput || $[15] !== t8 || $[16] !== t9) {
            t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                autoFocus: true,
                placeholder: "e.g. a1b2c3",
                value: manualInput,
                onChange: t8,
                className: t9
            }, void 0, false, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 143,
                columnNumber: 13
            }, this);
            $[14] = manualInput;
            $[15] = t8;
            $[16] = t9;
            $[17] = t10;
        } else {
            t10 = $[17];
        }
        let t11;
        if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
            t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 group",
                children: [
                    "Access Live Tracker ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                        size: 20,
                        className: "group-hover:translate-x-1 transition-transform"
                    }, void 0, false, {
                        fileName: "[project]/src/app/track/page.jsx",
                        lineNumber: 153,
                        columnNumber: 228
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 153,
                columnNumber: 13
            }, this);
            $[18] = t11;
        } else {
            t11 = $[18];
        }
        let t12;
        if ($[19] !== handleManualSubmit || $[20] !== t10 || $[21] !== t7) {
            t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-slate-100 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl max-w-sm w-full text-center relative overflow-hidden",
                    children: [
                        t3,
                        t4,
                        t5,
                        t6,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleManualSubmit,
                            className: "flex flex-col gap-4",
                            children: [
                                t7,
                                t10,
                                t11
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/track/page.jsx",
                            lineNumber: 160,
                            columnNumber: 257
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 160,
                    columnNumber: 93
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 160,
                columnNumber: 13
            }, this);
            $[19] = handleManualSubmit;
            $[20] = t10;
            $[21] = t7;
            $[22] = t12;
        } else {
            t12 = $[22];
        }
        return t12;
    }
    let t3;
    if ($[23] !== queueState.completedList) {
        t3 = queueState.completedList?.length > 0 ? Math.max(...queueState.completedList.map(_PatientTrackingScreenQueueStateCompletedListMap)) : 0;
        $[23] = queueState.completedList;
        $[24] = t3;
    } else {
        t3 = $[24];
    }
    const highestCompleted = t3;
    let patientStatus = "WAITING";
    if (queueState.currentlyServing === myToken) {
        patientStatus = "ACTIVE";
    } else {
        if (myToken <= highestCompleted) {
            patientStatus = "COMPLETED";
        }
    }
    const baseReferenceToken = queueState.currentlyServing || highestCompleted || 0;
    const positionInQueue = Math.max(0, myToken - baseReferenceToken);
    let t4;
    if ($[25] !== positionInQueue || $[26] !== queueState.rollingAverageTime) {
        t4 = positionInQueue > 0 ? Math.round(positionInQueue * queueState.rollingAverageTime) : 0;
        $[25] = positionInQueue;
        $[26] = queueState.rollingAverageTime;
        $[27] = t4;
    } else {
        t4 = $[27];
    }
    const estimatedWaitMinutes = t4;
    let t5;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
            size: 16,
            className: "text-blue-500"
        }, void 0, false, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 201,
            columnNumber: 10
        }, this);
        $[28] = t5;
    } else {
        t5 = $[28];
    }
    const t6 = queueState.currentlyServing || "--";
    let t7;
    if ($[29] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 font-bold text-slate-700 bg-white/80 px-3 py-1.5 rounded-xl shadow-sm",
            children: [
                t5,
                "Now Serving: ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-blue-600 text-lg",
                    children: [
                        "#",
                        t6
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 209,
                    columnNumber: 138
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 209,
            columnNumber: 10
        }, this);
        $[29] = t6;
        $[30] = t7;
    } else {
        t7 = $[30];
    }
    let t8;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 text-[10px] font-bold text-green-600 bg-green-100/80 px-3 py-1.5 rounded-full shadow-sm tracking-wider",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative flex h-2 w-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                        }, void 0, false, {
                            fileName: "[project]/src/app/track/page.jsx",
                            lineNumber: 217,
                            columnNumber: 194
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative inline-flex rounded-full h-2 w-2 bg-green-500"
                        }, void 0, false, {
                            fileName: "[project]/src/app/track/page.jsx",
                            lineNumber: 217,
                            columnNumber: 299
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 217,
                    columnNumber: 154
                }, this),
                "LIVE SYNC"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 217,
            columnNumber: 10
        }, this);
        $[31] = t8;
    } else {
        t8 = $[31];
    }
    let t9;
    if ($[32] !== t7) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between items-center w-full absolute top-0 left-0 px-6 py-5 bg-white/40 border-b border-white/50",
            children: [
                t7,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 224,
            columnNumber: 10
        }, this);
        $[32] = t7;
        $[33] = t9;
    } else {
        t9 = $[33];
    }
    let t10;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-slate-500 font-medium mb-1 mt-16",
            children: "Your Token"
        }, void 0, false, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 232,
            columnNumber: 11
        }, this);
        $[34] = t10;
    } else {
        t10 = $[34];
    }
    let t11;
    if ($[35] !== myToken) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-7xl font-black text-slate-800 mb-8 tracking-tight",
            children: [
                "#",
                myToken
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 239,
            columnNumber: 11
        }, this);
        $[35] = myToken;
        $[36] = t11;
    } else {
        t11 = $[36];
    }
    let t12;
    if ($[37] !== estimatedWaitMinutes || $[38] !== patientStatus || $[39] !== positionInQueue || $[40] !== queueState.activeRoom) {
        t12 = patientStatus === "COMPLETED" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-emerald-50 border border-emerald-200 text-emerald-700 py-6 px-4 rounded-3xl shadow-sm flex flex-col items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    size: 40,
                    className: "mb-3 text-emerald-500"
                }, void 0, false, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 247,
                    columnNumber: 176
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold mb-1",
                    children: "Appointment Complete"
                }, void 0, false, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 247,
                    columnNumber: 236
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-medium opacity-80",
                    children: "This token has already been served."
                }, void 0, false, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 247,
                    columnNumber: 300
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 247,
            columnNumber: 43
        }, this) : patientStatus === "ACTIVE" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-indigo-600 text-white py-6 rounded-3xl shadow-lg animate-pulse",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-2xl font-bold mb-3",
                    children: "It's Your Turn!"
                }, void 0, false, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 247,
                    columnNumber: 506
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/20 inline-block px-6 py-2 rounded-full font-bold text-xl tracking-wide border border-white/40",
                    children: [
                        "Proceed to ",
                        queueState.activeRoom || "the Doctor"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 247,
                    columnNumber: 566
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 247,
            columnNumber: 423
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            className: "text-blue-500 mb-2",
                            size: 28
                        }, void 0, false, {
                            fileName: "[project]/src/app/track/page.jsx",
                            lineNumber: 247,
                            columnNumber: 894
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-3xl font-bold text-slate-800",
                            children: positionInQueue
                        }, void 0, false, {
                            fileName: "[project]/src/app/track/page.jsx",
                            lineNumber: 247,
                            columnNumber: 944
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-medium text-slate-400 uppercase tracking-wider mt-1",
                            children: "Ahead of You"
                        }, void 0, false, {
                            fileName: "[project]/src/app/track/page.jsx",
                            lineNumber: 247,
                            columnNumber: 1018
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 247,
                    columnNumber: 791
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                            className: "text-orange-400 mb-2",
                            size: 28
                        }, void 0, false, {
                            fileName: "[project]/src/app/track/page.jsx",
                            lineNumber: 247,
                            columnNumber: 1227
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-3xl font-bold text-slate-800",
                            children: [
                                estimatedWaitMinutes,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: "m"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/track/page.jsx",
                                    lineNumber: 247,
                                    columnNumber: 1352
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/track/page.jsx",
                            lineNumber: 247,
                            columnNumber: 1279
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-medium text-slate-400 uppercase tracking-wider mt-1",
                            children: "Est. Wait"
                        }, void 0, false, {
                            fileName: "[project]/src/app/track/page.jsx",
                            lineNumber: 247,
                            columnNumber: 1392
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/track/page.jsx",
                    lineNumber: 247,
                    columnNumber: 1124
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 247,
            columnNumber: 751
        }, this);
        $[37] = estimatedWaitMinutes;
        $[38] = patientStatus;
        $[39] = positionInQueue;
        $[40] = queueState.activeRoom;
        $[41] = t12;
    } else {
        t12 = $[41];
    }
    let t13;
    if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 258,
            columnNumber: 11
        }, this);
        $[42] = t13;
    } else {
        t13 = $[42];
    }
    let t14;
    if ($[43] !== queueState.rollingAverageTime) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 pt-6 border-t border-slate-200/50 flex items-center justify-center gap-2 text-xs text-slate-400",
            children: [
                t13,
                " Doctor's current rolling pace: ",
                queueState.rollingAverageTime,
                " min/patient"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 265,
            columnNumber: 11
        }, this);
        $[43] = queueState.rollingAverageTime;
        $[44] = t14;
    } else {
        t14 = $[44];
    }
    let t15;
    if ($[45] !== t11 || $[46] !== t12 || $[47] !== t14 || $[48] !== t9) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2rem] p-8 text-center relative overflow-hidden",
                children: [
                    t9,
                    t10,
                    t11,
                    t12,
                    t14
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/track/page.jsx",
                lineNumber: 273,
                columnNumber: 100
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/track/page.jsx",
            lineNumber: 273,
            columnNumber: 11
        }, this);
        $[45] = t11;
        $[46] = t12;
        $[47] = t14;
        $[48] = t9;
        $[49] = t15;
    } else {
        t15 = $[49];
    }
    return t15;
}
_s(PatientTrackingScreen, "7AU3Q4MxcXVuBnBqzsJxJ9eGQgg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = PatientTrackingScreen;
function _PatientTrackingScreenQueueStateCompletedListMap(t) {
    return t.tokenNumber;
}
function _PatientTrackingScreenUseEffectAnonymous(res) {
    return res.json();
}
var _c;
__turbopack_context__.k.register(_c, "PatientTrackingScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1k_1_p0._.js.map