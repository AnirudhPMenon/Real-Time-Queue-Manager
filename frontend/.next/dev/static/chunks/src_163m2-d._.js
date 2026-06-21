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
"[project]/src/app/receptionist/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReceptionistDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSocket.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.mjs [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$todo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListTodo$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-todo.mjs [app-client] (ecmascript) <export default as ListTodo>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.mjs [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.mjs [app-client] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-qr-code/lib/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ReceptionistDashboard() {
    _s();
    const clinicId = "clinic_123";
    const { queueState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"])(clinicId);
    const [patientName, setPatientName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [myRoom, setMyRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('AUTO');
    const [selectedQR, setSelectedQR] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReceptionistDashboard.useEffect": ()=>{
            const handleKeyDown = {
                "ReceptionistDashboard.useEffect.handleKeyDown": async (e)=>{
                    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && !selectedQR) {
                        e.preventDefault();
                        callNextPatient();
                    }
                }
            }["ReceptionistDashboard.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "ReceptionistDashboard.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["ReceptionistDashboard.useEffect"];
        }
    }["ReceptionistDashboard.useEffect"], [
        myRoom,
        selectedQR
    ]);
    const addPatient = async (e_0)=>{
        e_0.preventDefault();
        if (!patientName.trim()) return;
        await fetch('http://localhost:5000/api/queue/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clinicId,
                patientName
            })
        });
        setPatientName('');
    };
    const callNextPatient = async ()=>{
        await fetch('http://localhost:5000/api/queue/next', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clinicId,
                roomNumber: myRoom
            })
        });
    };
    const formatTime = (isoString)=>{
        if (!isoString) return '--:--';
        return new Date(isoString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const generateTrackingUrl = (code)=>{
        return `${window.location.origin}/track?code=${code}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 relative",
        children: [
            selectedQR && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center relative max-w-sm w-full animate-in zoom-in-95 duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSelectedQR(null),
                            className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-2 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionist/page.jsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionist/page.jsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-indigo-100 text-indigo-600 p-4 rounded-full mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                size: 32
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionist/page.jsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionist/page.jsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-slate-800 mb-2",
                            children: "Scan to Track"
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionist/page.jsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-500 text-center mb-8 text-sm",
                            children: "Point your phone camera here to instantly view your live wait time."
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionist/page.jsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white border-4 border-indigo-50 p-4 rounded-2xl shadow-sm mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$code$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: generateTrackingUrl(selectedQR),
                                size: 200,
                                className: "text-slate-800"
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionist/page.jsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/receptionist/page.jsx",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-slate-400 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 uppercase tracking-widest",
                            children: [
                                "Code: ",
                                selectedQR
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/receptionist/page.jsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/receptionist/page.jsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/receptionist/page.jsx",
                lineNumber: 65,
                columnNumber: 22
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-3xl p-6 flex flex-col justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-semibold mb-6 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                className: "text-blue-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 92,
                                                columnNumber: 15
                                            }, this),
                                            " Queue Entry"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: addPatient,
                                        className: "flex flex-col gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            autoFocus: true,
                                            placeholder: "Type patient name & hit Enter...",
                                            value: patientName,
                                            onChange: (e_1)=>setPatientName(e_1.target.value),
                                            className: "w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/receptionist/page.jsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionist/page.jsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-3xl p-6 flex-1 flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$todo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListTodo$3e$__["ListTodo"], {
                                                        className: "text-indigo-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                        lineNumber: 102,
                                                        columnNumber: 17
                                                    }, this),
                                                    " Up Next (",
                                                    queueState.waitingList?.length || 0,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 101,
                                                columnNumber: 15
                                            }, this),
                                            queueState.waitingList?.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-slate-400 italic text-center py-8",
                                                children: "Queue is empty."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 104,
                                                columnNumber: 55
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-3 overflow-y-auto max-h-[300px] pr-2",
                                                children: queueState.waitingList?.map((patient, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex justify-between items-center group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "bg-slate-100 text-slate-500 font-bold h-8 w-8 rounded-full flex items-center justify-center text-sm",
                                                                        children: index + 1
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                                        lineNumber: 107,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-slate-800",
                                                                        children: patient.patientName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                                        lineNumber: 110,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                                lineNumber: 106,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-end gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-indigo-600 font-black text-lg leading-none mb-1",
                                                                        children: [
                                                                            "#",
                                                                            patient.tokenNumber
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                                        lineNumber: 114,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>setSelectedQR(patient.accessCode),
                                                                                className: "flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 bg-slate-100 px-2 py-1 rounded border border-slate-200 transition-colors uppercase tracking-widest",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                                                                        size: 12
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                                                        lineNumber: 117,
                                                                                        columnNumber: 29
                                                                                    }, this),
                                                                                    " QR"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                                                lineNumber: 116,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>window.open(`/track?code=${patient.accessCode}`, '_blank'),
                                                                                className: "flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 bg-emerald-100/50 px-2 py-1 rounded border border-emerald-200 transition-colors uppercase tracking-widest shadow-sm",
                                                                                children: "🔗 Open Link"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                                                lineNumber: 119,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                                        lineNumber: 115,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                                lineNumber: 113,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, patient.tokenNumber, true, {
                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                        lineNumber: 105,
                                                        columnNumber: 68
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 104,
                                                columnNumber: 135
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-100/50 backdrop-blur-xl border border-white/50 shadow-inner rounded-3xl p-6 flex-1 flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-lg font-semibold mb-4 flex items-center gap-2 text-slate-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                        className: "text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                        lineNumber: 130,
                                                        columnNumber: 17
                                                    }, this),
                                                    " Recently Completed"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this),
                                            queueState.completedList?.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-slate-400 italic text-center py-8",
                                                children: "No completed patients yet."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 132,
                                                columnNumber: 57
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-3 overflow-y-auto max-h-[300px] pr-2",
                                                children: queueState.completedList?.map((patient_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white/60 border border-slate-200/60 p-3 rounded-2xl flex justify-between items-center opacity-80 hover:opacity-100 transition-opacity",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        className: "text-emerald-500",
                                                                        size: 20
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                                        lineNumber: 135,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "font-semibold text-slate-700 text-sm",
                                                                                children: [
                                                                                    patient_0.patientName,
                                                                                    " ",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-slate-400 font-normal",
                                                                                        children: [
                                                                                            "#",
                                                                                            patient_0.tokenNumber
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                                                        lineNumber: 137,
                                                                                        columnNumber: 105
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                                                lineNumber: 137,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs text-slate-400",
                                                                                children: patient_0.assignedRoom || 'Room 1'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                                                lineNumber: 138,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                                        lineNumber: 136,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                                lineNumber: 134,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400 text-xs font-medium bg-slate-200/50 px-2 py-1 rounded-lg",
                                                                children: formatTime(patient_0.completedAt)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                                lineNumber: 141,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, patient_0.tokenNumber, true, {
                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                        lineNumber: 133,
                                                        columnNumber: 63
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 132,
                                                columnNumber: 148
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionist/page.jsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionist/page.jsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl rounded-3xl p-8 text-white flex flex-col relative overflow-hidden h-full min-h-[500px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 right-0 p-8 opacity-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                    size: 120
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionist/page.jsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionist/page.jsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-blue-100 mb-6 flex items-center gap-2 border-b border-blue-400/30 pb-4 z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this),
                                    " Currently with Doctors"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionist/page.jsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex flex-col gap-4 mb-8 w-full z-10 overflow-y-auto pr-2",
                                children: !queueState.activeList || queueState.activeList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex items-center justify-center text-blue-200/50 italic font-medium",
                                    children: "All doctor rooms are empty."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/receptionist/page.jsx",
                                    lineNumber: 161,
                                    columnNumber: 77
                                }, this) : queueState.activeList.map((patient_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 flex justify-between items-center shadow-lg hover:bg-white/30 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold text-blue-200 uppercase tracking-widest mb-1",
                                                        children: patient_1.assignedRoom
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                        lineNumber: 165,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-xl text-white leading-none",
                                                        children: patient_1.patientName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                                        lineNumber: 168,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 164,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-4xl font-black text-white drop-shadow-md",
                                                children: [
                                                    "#",
                                                    patient_1.tokenNumber
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, patient_1.tokenNumber, true, {
                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                        lineNumber: 163,
                                        columnNumber: 63
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/receptionist/page.jsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full mt-auto z-10 pt-4 border-t border-blue-400/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full mb-4 z-10 relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: myRoom,
                                            onChange: (e_2)=>setMyRoom(e_2.target.value),
                                            className: "w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/50 appearance-none text-center font-medium shadow-inner backdrop-blur-sm cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "AUTO",
                                                    className: "text-slate-800 font-bold",
                                                    children: "⚡ Auto-Assign Available Room"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionist/page.jsx",
                                                    lineNumber: 181,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    disabled: true,
                                                    className: "text-slate-400",
                                                    children: "────────────────"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionist/page.jsx",
                                                    lineNumber: 182,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Room 1",
                                                    className: "text-slate-800 font-medium",
                                                    children: "Clear Room & Assign: Doctor A (Room 1)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionist/page.jsx",
                                                    lineNumber: 183,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Room 2",
                                                    className: "text-slate-800 font-medium",
                                                    children: "Clear Room & Assign: Doctor B (Room 2)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionist/page.jsx",
                                                    lineNumber: 184,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Room 3",
                                                    className: "text-slate-800 font-medium",
                                                    children: "Clear Room & Assign: Doctor C (Room 3)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/receptionist/page.jsx",
                                                    lineNumber: 185,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/receptionist/page.jsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: callNextPatient,
                                        className: "group w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold text-xl py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 z-10",
                                        children: [
                                            "Call Next ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "group-hover:translate-x-1 transition-transform"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 190,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-center text-blue-200 text-sm z-10",
                                        children: [
                                            "Or press ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                className: "bg-blue-800/30 px-2 py-1 rounded text-white font-mono text-xs",
                                                children: "Spacebar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/receptionist/page.jsx",
                                                lineNumber: 192,
                                                columnNumber: 81
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/receptionist/page.jsx",
                                        lineNumber: 192,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/receptionist/page.jsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/receptionist/page.jsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/receptionist/page.jsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/receptionist/page.jsx",
        lineNumber: 62,
        columnNumber: 10
    }, this);
}
_s(ReceptionistDashboard, "7bkEpIOx2/TlGqnyz7I69mPUpqs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocket"]
    ];
});
_c = ReceptionistDashboard;
var _c;
__turbopack_context__.k.register(_c, "ReceptionistDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_163m2-d._.js.map