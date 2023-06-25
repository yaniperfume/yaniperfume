/*
 Highcharts JS v8.2.0 (2020-08-20)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d) {
    "object" === typeof module && module.exports ? (d["default"] = d, module.exports = d) : "function" === typeof define && define.amd ? define("highcharts/highcharts-more", ["highcharts"], function(C) {
        d(C);
        d.Highcharts = C;
        return d
    }) : d("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(d) {
    function C(d, a, g, h) {
        d.hasOwnProperty(a) || (d[a] = h.apply(null, g))
    }
    d = d ? d._modules : {};
    C(d, "Extensions/Pane.js", [d["Core/Chart/Chart.js"], d["Core/Globals.js"], d["Core/Pointer.js"], d["Core/Utilities.js"], d["Mixins/CenteredSeries.js"]],
        function(d, a, g, h, b) {
            function r(m, l, e) {
                return Math.sqrt(Math.pow(m - e[0], 2) + Math.pow(l - e[1], 2)) <= e[2] / 2
            }
            var t = h.addEvent,
                x = h.extend,
                B = h.merge,
                z = h.pick,
                l = h.splat;
            d.prototype.collectionsWithUpdate.push("pane");
            h = function() {
                function m(m, l) {
                    this.options = this.chart = this.center = this.background = void 0;
                    this.coll = "pane";
                    this.defaultOptions = {
                        center: ["50%", "50%"],
                        size: "85%",
                        innerSize: "0%",
                        startAngle: 0
                    };
                    this.defaultBackgroundOptions = {
                        shape: "circle",
                        borderWidth: 1,
                        borderColor: "#cccccc",
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, "#ffffff"],
                                [1, "#e6e6e6"]
                            ]
                        },
                        from: -Number.MAX_VALUE,
                        innerRadius: 0,
                        to: Number.MAX_VALUE,
                        outerRadius: "105%"
                    };
                    this.init(m, l)
                }
                m.prototype.init = function(m, l) {
                    this.chart = l;
                    this.background = [];
                    l.pane.push(this);
                    this.setOptions(m)
                };
                m.prototype.setOptions = function(m) {
                    this.options = B(this.defaultOptions, this.chart.angular ? {
                        background: {}
                    } : void 0, m)
                };
                m.prototype.render = function() {
                    var m = this.options,
                        e = this.options.background,
                        a = this.chart.renderer;
                    this.group || (this.group = a.g("pane-group").attr({
                        zIndex: m.zIndex ||
                            0
                    }).add());
                    this.updateCenter();
                    if (e)
                        for (e = l(e), m = Math.max(e.length, this.background.length || 0), a = 0; a < m; a++) e[a] && this.axis ? this.renderBackground(B(this.defaultBackgroundOptions, e[a]), a) : this.background[a] && (this.background[a] = this.background[a].destroy(), this.background.splice(a, 1))
                };
                m.prototype.renderBackground = function(m, l) {
                    var e = "animate",
                        a = {
                            "class": "highcharts-pane " + (m.className || "")
                        };
                    this.chart.styledMode || x(a, {
                        fill: m.backgroundColor,
                        stroke: m.borderColor,
                        "stroke-width": m.borderWidth
                    });
                    this.background[l] ||
                        (this.background[l] = this.chart.renderer.path().add(this.group), e = "attr");
                    this.background[l][e]({
                        d: this.axis.getPlotBandPath(m.from, m.to, m)
                    }).attr(a)
                };
                m.prototype.updateCenter = function(m) {
                    this.center = (m || this.axis || {}).center = b.getCenter.call(this)
                };
                m.prototype.update = function(m, l) {
                    B(!0, this.options, m);
                    B(!0, this.chart.options.pane, m);
                    this.setOptions(this.options);
                    this.render();
                    this.chart.axes.forEach(function(m) {
                        m.pane === this && (m.pane = null, m.update({}, l))
                    }, this)
                };
                return m
            }();
            a.Chart.prototype.getHoverPane =
                function(m) {
                    var l = this,
                        a;
                    m && l.pane.forEach(function(e) {
                        var b = m.chartX - l.plotLeft,
                            k = m.chartY - l.plotTop;
                        r(l.inverted ? k : b, l.inverted ? b : k, e.center) && (a = e)
                    });
                    return a
                };
            t(d, "afterIsInsidePlot", function(m) {
                this.polar && (m.isInsidePlot = this.pane.some(function(l) {
                    return r(m.x, m.y, l.center)
                }))
            });
            t(g, "beforeGetHoverData", function(m) {
                var l = this.chart;
                l.polar && (l.hoverPane = l.getHoverPane(m), m.filter = function(a) {
                    return a.visible && !(!m.shared && a.directTouch) && z(a.options.enableMouseTracking, !0) && (!l.hoverPane || a.xAxis.pane ===
                        l.hoverPane)
                })
            });
            t(g, "afterGetHoverData", function(m) {
                var l = this.chart;
                m.hoverPoint && m.hoverPoint.plotX && m.hoverPoint.plotY && l.hoverPane && !r(m.hoverPoint.plotX, m.hoverPoint.plotY, l.hoverPane.center) && (m.hoverPoint = void 0)
            });
            a.Pane = h;
            return a.Pane
        });
    C(d, "Core/Axis/HiddenAxis.js", [], function() {
        return function() {
            function d() {}
            d.init = function(a) {
                a.getOffset = function() {};
                a.redraw = function() {
                    this.isDirty = !1
                };
                a.render = function() {
                    this.isDirty = !1
                };
                a.createLabelCollector = function() {
                    return function() {}
                };
                a.setScale =
                    function() {};
                a.setCategories = function() {};
                a.setTitle = function() {};
                a.isHidden = !0
            };
            return d
        }()
    });
    C(d, "Core/Axis/RadialAxis.js", [d["Core/Axis/Axis.js"], d["Core/Axis/Tick.js"], d["Core/Axis/HiddenAxis.js"], d["Core/Utilities.js"]], function(d, a, g, h) {
        var b = h.addEvent,
            r = h.correctFloat,
            t = h.defined,
            x = h.extend,
            B = h.fireEvent,
            z = h.merge,
            l = h.pick,
            m = h.relativeLength,
            v = h.wrap;
        h = function() {
            function a() {}
            a.init = function(a) {
                var b = d.prototype;
                a.setOptions = function(k) {
                    k = this.options = z(a.constructor.defaultOptions, this.defaultPolarOptions,
                        k);
                    k.plotBands || (k.plotBands = []);
                    B(this, "afterSetOptions")
                };
                a.getOffset = function() {
                    b.getOffset.call(this);
                    this.chart.axisOffset[this.side] = 0
                };
                a.getLinePath = function(k, p, c) {
                    k = this.pane.center;
                    var f = this.chart,
                        n = l(p, k[2] / 2 - this.offset);
                    "undefined" === typeof c && (c = this.horiz ? 0 : this.center && -this.center[3] / 2);
                    c && (n += c);
                    this.isCircular || "undefined" !== typeof p ? (p = this.chart.renderer.symbols.arc(this.left + k[0], this.top + k[1], n, n, {
                        start: this.startAngleRad,
                        end: this.endAngleRad,
                        open: !0,
                        innerR: 0
                    }), p.xBounds = [this.left +
                        k[0]
                    ], p.yBounds = [this.top + k[1] - n]) : (p = this.postTranslate(this.angleRad, n), p = [
                        ["M", this.center[0] + f.plotLeft, this.center[1] + f.plotTop],
                        ["L", p.x, p.y]
                    ]);
                    return p
                };
                a.setAxisTranslation = function() {
                    b.setAxisTranslation.call(this);
                    this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : (this.center[2] - this.center[3]) / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0)
                };
                a.beforeSetTickPositions = function() {
                    this.autoConnect =
                        this.isCircular && "undefined" === typeof l(this.userMax, this.options.max) && r(this.endAngleRad - this.startAngleRad) === r(2 * Math.PI);
                    !this.isCircular && this.chart.inverted && this.max++;
                    this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0)
                };
                a.setAxisSize = function() {
                    b.setAxisSize.call(this);
                    if (this.isRadial) {
                        this.pane.updateCenter(this);
                        var k = this.center = x([], this.pane.center);
                        if (this.isCircular) this.sector = this.endAngleRad - this.startAngleRad;
                        else {
                            var p = this.postTranslate(this.angleRad,
                                k[3] / 2);
                            k[0] = p.x - this.chart.plotLeft;
                            k[1] = p.y - this.chart.plotTop
                        }
                        this.len = this.width = this.height = (k[2] - k[3]) * l(this.sector, 1) / 2
                    }
                };
                a.getPosition = function(k, p) {
                    k = this.translate(k);
                    return this.postTranslate(this.isCircular ? k : this.angleRad, l(this.isCircular ? p : 0 > k ? 0 : k, this.center[2] / 2) - this.offset)
                };
                a.postTranslate = function(k, p) {
                    var c = this.chart,
                        f = this.center;
                    k = this.startAngleRad + k;
                    return {
                        x: c.plotLeft + f[0] + Math.cos(k) * p,
                        y: c.plotTop + f[1] + Math.sin(k) * p
                    }
                };
                a.getPlotBandPath = function(k, p, c) {
                    var f = function(c) {
                            if ("string" ===
                                typeof c) {
                                var f = parseInt(c, 10);
                                D.test(c) && (f = f * A / 100);
                                return f
                            }
                            return c
                        },
                        n = this.center,
                        u = this.startAngleRad,
                        A = n[2] / 2,
                        q = Math.min(this.offset, 0),
                        D = /%$/;
                    var m = this.isCircular;
                    var a = l(f(c.outerRadius), A),
                        b = f(c.innerRadius);
                    f = l(f(c.thickness), 10);
                    if ("polygon" === this.options.gridLineInterpolation) q = this.getPlotLinePath({
                        value: k
                    }).concat(this.getPlotLinePath({
                        value: p,
                        reverse: !0
                    }));
                    else {
                        k = Math.max(k, this.min);
                        p = Math.min(p, this.max);
                        k = this.translate(k);
                        p = this.translate(p);
                        m || (a = k || 0, b = p || 0);
                        if ("circle" !==
                            c.shape && m) c = u + (k || 0), u += p || 0;
                        else {
                            c = -Math.PI / 2;
                            u = 1.5 * Math.PI;
                            var e = !0
                        }
                        a -= q;
                        q = this.chart.renderer.symbols.arc(this.left + n[0], this.top + n[1], a, a, {
                            start: Math.min(c, u),
                            end: Math.max(c, u),
                            innerR: l(b, a - (f - q)),
                            open: e
                        });
                        m && (m = (u + c) / 2, e = this.left + n[0] + n[2] / 2 * Math.cos(m), q.xBounds = m > -Math.PI / 2 && m < Math.PI / 2 ? [e, this.chart.plotWidth] : [0, e], q.yBounds = [this.top + n[1] + n[2] / 2 * Math.sin(m)], q.yBounds[0] += m > -Math.PI && 0 > m || m > Math.PI ? -10 : 10)
                    }
                    return q
                };
                a.getCrosshairPosition = function(k, p, c) {
                    var f = k.value,
                        n = this.pane.center;
                    if (this.isCircular) {
                        if (t(f)) k.point && (u = k.point.shapeArgs || {}, u.start && (f = this.chart.inverted ? this.translate(k.point.rectPlotY, !0) : k.point.x));
                        else {
                            var u = k.chartX || 0;
                            var A = k.chartY || 0;
                            f = this.translate(Math.atan2(A - c, u - p) - this.startAngleRad, !0)
                        }
                        k = this.getPosition(f);
                        u = k.x;
                        A = k.y
                    } else t(f) || (u = k.chartX, A = k.chartY), t(u) && t(A) && (c = n[1] + this.chart.plotTop, f = this.translate(Math.min(Math.sqrt(Math.pow(u - p, 2) + Math.pow(A - c, 2)), n[2] / 2) - n[3] / 2, !0));
                    return [f, u || 0, A || 0]
                };
                a.getPlotLinePath = function(k) {
                    var p = this,
                        c = p.pane.center,
                        f = p.chart,
                        n = f.inverted,
                        u = k.value,
                        A = k.reverse,
                        q = p.getPosition(u),
                        D = p.pane.options.background ? p.pane.options.background[0] || p.pane.options.background : {},
                        l = D.innerRadius || "0%",
                        a = D.outerRadius || "100%";
                    D = c[0] + f.plotLeft;
                    var b = c[1] + f.plotTop,
                        e = q.x,
                        h = q.y,
                        g = p.height;
                    q = c[3] / 2;
                    var v;
                    k.isCrosshair && (h = this.getCrosshairPosition(k, D, b), u = h[0], e = h[1], h = h[2]);
                    if (p.isCircular) u = Math.sqrt(Math.pow(e - D, 2) + Math.pow(h - b, 2)), A = "string" === typeof l ? m(l, 1) : l / u, f = "string" === typeof a ? m(a, 1) : a / u, c && q && (u = q /
                        u, A < u && (A = u), f < u && (f = u)), c = [
                        ["M", D + A * (e - D), b - A * (b - h)],
                        ["L", e - (1 - f) * (e - D), h + (1 - f) * (b - h)]
                    ];
                    else if ((u = p.translate(u)) && (0 > u || u > g) && (u = 0), "circle" === p.options.gridLineInterpolation) c = p.getLinePath(0, u, q);
                    else if (c = [], f[n ? "yAxis" : "xAxis"].forEach(function(c) {
                            c.pane === p.pane && (v = c)
                        }), v)
                        for (D = v.tickPositions, v.autoConnect && (D = D.concat([D[0]])), A && (D = D.slice().reverse()), u && (u += q), e = 0; e < D.length; e++) b = v.getPosition(D[e], u), c.push(e ? ["L", b.x, b.y] : ["M", b.x, b.y]);
                    return c
                };
                a.getTitlePosition = function() {
                    var k =
                        this.center,
                        p = this.chart,
                        c = this.options.title;
                    return {
                        x: p.plotLeft + k[0] + (c.x || 0),
                        y: p.plotTop + k[1] - {
                            high: .5,
                            middle: .25,
                            low: 0
                        }[c.align] * k[2] + (c.y || 0)
                    }
                };
                a.createLabelCollector = function() {
                    var k = this;
                    return function() {
                        if (k.isRadial && k.tickPositions && !0 !== k.options.labels.allowOverlap) return k.tickPositions.map(function(p) {
                            return k.ticks[p] && k.ticks[p].label
                        }).filter(function(p) {
                            return !!p
                        })
                    }
                }
            };
            a.compose = function(e, h) {
                b(e, "init", function(k) {
                    var p = this.chart,
                        c = p.inverted,
                        f = p.angular,
                        n = p.polar,
                        u = this.isXAxis,
                        A = this.coll,
                        q = f && u,
                        m, l = p.options;
                    k = k.userOptions.pane || 0;
                    k = this.pane = p.pane && p.pane[k];
                    if ("colorAxis" === A) this.isRadial = !1;
                    else {
                        if (f) {
                            if (q ? g.init(this) : a.init(this), m = !u) this.defaultPolarOptions = a.defaultRadialGaugeOptions
                        } else n && (a.init(this), this.defaultPolarOptions = (m = this.horiz) ? a.defaultCircularOptions : z("xAxis" === A ? e.defaultOptions : e.defaultYAxisOptions, a.defaultRadialOptions), c && "yAxis" === A && (this.defaultPolarOptions.stackLabels = e.defaultYAxisOptions.stackLabels));
                        f || n ? (this.isRadial = !0, l.chart.zoomType =
                            null, this.labelCollector || (this.labelCollector = this.createLabelCollector()), this.labelCollector && p.labelCollectors.push(this.labelCollector)) : this.isRadial = !1;
                        k && m && (k.axis = this);
                        this.isCircular = m
                    }
                });
                b(e, "afterInit", function() {
                    var k = this.chart,
                        p = this.options,
                        c = this.pane,
                        f = c && c.options;
                    k.angular && this.isXAxis || !c || !k.angular && !k.polar || (this.angleRad = (p.angle || 0) * Math.PI / 180, this.startAngleRad = (f.startAngle - 90) * Math.PI / 180, this.endAngleRad = (l(f.endAngle, f.startAngle + 360) - 90) * Math.PI / 180, this.offset =
                        p.offset || 0)
                });
                b(e, "autoLabelAlign", function(k) {
                    this.isRadial && (k.align = void 0, k.preventDefault())
                });
                b(e, "destroy", function() {
                    if (this.chart && this.chart.labelCollectors) {
                        var k = this.labelCollector ? this.chart.labelCollectors.indexOf(this.labelCollector) : -1;
                        0 <= k && this.chart.labelCollectors.splice(k, 1)
                    }
                });
                b(e, "initialAxisTranslation", function() {
                    this.isRadial && this.beforeSetTickPositions()
                });
                b(h, "afterGetPosition", function(k) {
                    this.axis.getPosition && x(k.pos, this.axis.getPosition(this.pos))
                });
                b(h, "afterGetLabelPosition",
                    function(k) {
                        var p = this.axis,
                            c = this.label;
                        if (c) {
                            var f = c.getBBox(),
                                n = p.options.labels,
                                u = n.y,
                                A = 20,
                                q = n.align,
                                a = (p.translate(this.pos) + p.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360,
                                e = Math.round(a),
                                b = "end",
                                h = 0 > e ? e + 360 : e,
                                g = h,
                                v = 0,
                                r = 0,
                                w = null === n.y ? .3 * -f.height : 0;
                            if (p.isRadial) {
                                var y = p.getPosition(this.pos, p.center[2] / 2 + m(l(n.distance, -25), p.center[2] / 2, -p.center[2] / 2));
                                "auto" === n.rotation ? c.attr({
                                    rotation: a
                                }) : null === u && (u = p.chart.renderer.fontMetrics(c.styles && c.styles.fontSize).b - f.height / 2);
                                null === q && (p.isCircular ?
                                    (f.width > p.len * p.tickInterval / (p.max - p.min) && (A = 0), q = a > A && a < 180 - A ? "left" : a > 180 + A && a < 360 - A ? "right" : "center") : q = "center", c.attr({
                                        align: q
                                    }));
                                if ("auto" === q && 2 === p.tickPositions.length && p.isCircular) {
                                    90 < h && 180 > h ? h = 180 - h : 270 < h && 360 >= h && (h = 540 - h);
                                    180 < g && 360 >= g && (g = 360 - g);
                                    if (p.pane.options.startAngle === e || p.pane.options.startAngle === e + 360 || p.pane.options.startAngle === e - 360) b = "start";
                                    q = -90 <= e && 90 >= e || -360 <= e && -270 >= e || 270 <= e && 360 >= e ? "start" === b ? "right" : "left" : "start" === b ? "left" : "right";
                                    70 < g && 110 > g && (q = "center");
                                    15 > h || 180 <= h && 195 > h ? v = .3 * f.height : 15 <= h && 35 >= h ? v = "start" === b ? 0 : .75 * f.height : 195 <= h && 215 >= h ? v = "start" === b ? .75 * f.height : 0 : 35 < h && 90 >= h ? v = "start" === b ? .25 * -f.height : f.height : 215 < h && 270 >= h && (v = "start" === b ? f.height : .25 * -f.height);
                                    15 > g ? r = "start" === b ? .15 * -f.height : .15 * f.height : 165 < g && 180 >= g && (r = "start" === b ? .15 * f.height : .15 * -f.height);
                                    c.attr({
                                        align: q
                                    });
                                    c.translate(r, v + w)
                                }
                                k.pos.x = y.x + n.x;
                                k.pos.y = y.y + u
                            }
                        }
                    });
                v(h.prototype, "getMarkPath", function(k, p, c, f, n, u, A) {
                    var q = this.axis;
                    q.isRadial ? (k = q.getPosition(this.pos,
                        q.center[2] / 2 + f), p = ["M", p, c, "L", k.x, k.y]) : p = k.call(this, p, c, f, n, u, A);
                    return p
                })
            };
            a.defaultCircularOptions = {
                gridLineWidth: 1,
                labels: {
                    align: null,
                    distance: 15,
                    x: 0,
                    y: null,
                    style: {
                        textOverflow: "none"
                    }
                },
                maxPadding: 0,
                minPadding: 0,
                showLastLabel: !1,
                tickLength: 0
            };
            a.defaultRadialGaugeOptions = {
                labels: {
                    align: "center",
                    x: 0,
                    y: null
                },
                minorGridLineWidth: 0,
                minorTickInterval: "auto",
                minorTickLength: 10,
                minorTickPosition: "inside",
                minorTickWidth: 1,
                tickLength: 10,
                tickPosition: "inside",
                tickWidth: 2,
                title: {
                    rotation: 0
                },
                zIndex: 2
            };
            a.defaultRadialOptions = {
                gridLineInterpolation: "circle",
                gridLineWidth: 1,
                labels: {
                    align: "right",
                    x: -3,
                    y: -2
                },
                showLastLabel: !1,
                title: {
                    x: 4,
                    text: null,
                    rotation: 90
                }
            };
            return a
        }();
        h.compose(d, a);
        return h
    });
    C(d, "Series/AreaRangeSeries.js", [d["Core/Globals.js"], d["Core/Series/Point.js"], d["Core/Utilities.js"]], function(d, a, g) {
        var h = g.defined,
            b = g.extend,
            r = g.isArray,
            t = g.isNumber,
            x = g.pick;
        g = g.seriesType;
        var B = d.seriesTypes,
            z = d.Series.prototype,
            l = a.prototype;
        g("arearange", "area", {
            lineWidth: 1,
            threshold: null,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
            },
            trackByArea: !0,
            dataLabels: {
                align: void 0,
                verticalAlign: void 0,
                xLow: 0,
                xHigh: 0,
                yLow: 0,
                yHigh: 0
            }
        }, {
            pointArrayMap: ["low", "high"],
            pointValKey: "low",
            deferTranslatePolar: !0,
            toYData: function(m) {
                return [m.low, m.high]
            },
            highToXY: function(m) {
                var a = this.chart,
                    l = this.xAxis.postTranslate(m.rectPlotX, this.yAxis.len - m.plotHigh);
                m.plotHighX = l.x - a.plotLeft;
                m.plotHigh = l.y - a.plotTop;
                m.plotLowX = m.plotX
            },
            translate: function() {
                var m = this,
                    a = m.yAxis,
                    l = !!m.modifyValue;
                B.area.prototype.translate.apply(m);
                m.points.forEach(function(e) {
                    var b =
                        e.high,
                        k = e.plotY;
                    e.isNull ? e.plotY = null : (e.plotLow = k, e.plotHigh = a.translate(l ? m.modifyValue(b, e) : b, 0, 1, 0, 1), l && (e.yBottom = e.plotHigh))
                });
                this.chart.polar && this.points.forEach(function(a) {
                    m.highToXY(a);
                    a.tooltipPos = [(a.plotHighX + a.plotLowX) / 2, (a.plotHigh + a.plotLow) / 2]
                })
            },
            getGraphPath: function(a) {
                var l = [],
                    m = [],
                    b, h = B.area.prototype.getGraphPath;
                var k = this.options;
                var p = this.chart.polar,
                    c = p && !1 !== k.connectEnds,
                    f = k.connectNulls,
                    n = k.step;
                a = a || this.points;
                for (b = a.length; b--;) {
                    var u = a[b];
                    var A = p ? {
                        plotX: u.rectPlotX,
                        plotY: u.yBottom,
                        doCurve: !1
                    } : {
                        plotX: u.plotX,
                        plotY: u.plotY,
                        doCurve: !1
                    };
                    u.isNull || c || f || a[b + 1] && !a[b + 1].isNull || m.push(A);
                    var q = {
                        polarPlotY: u.polarPlotY,
                        rectPlotX: u.rectPlotX,
                        yBottom: u.yBottom,
                        plotX: x(u.plotHighX, u.plotX),
                        plotY: u.plotHigh,
                        isNull: u.isNull
                    };
                    m.push(q);
                    l.push(q);
                    u.isNull || c || f || a[b - 1] && !a[b - 1].isNull || m.push(A)
                }
                a = h.call(this, a);
                n && (!0 === n && (n = "left"), k.step = {
                    left: "right",
                    center: "center",
                    right: "left"
                }[n]);
                l = h.call(this, l);
                m = h.call(this, m);
                k.step = n;
                k = [].concat(a, l);
                !this.chart.polar && m[0] &&
                    "M" === m[0][0] && (m[0] = ["L", m[0][1], m[0][2]]);
                this.graphPath = k;
                this.areaPath = a.concat(m);
                k.isArea = !0;
                k.xMap = a.xMap;
                this.areaPath.xMap = a.xMap;
                return k
            },
            drawDataLabels: function() {
                var a = this.points,
                    l = a.length,
                    e, h = [],
                    g = this.options.dataLabels,
                    k, p = this.chart.inverted;
                if (r(g))
                    if (1 < g.length) {
                        var c = g[0];
                        var f = g[1]
                    } else c = g[0], f = {
                        enabled: !1
                    };
                else c = b({}, g), c.x = g.xHigh, c.y = g.yHigh, f = b({}, g), f.x = g.xLow, f.y = g.yLow;
                if (c.enabled || this._hasPointLabels) {
                    for (e = l; e--;)
                        if (k = a[e]) {
                            var n = c.inside ? k.plotHigh < k.plotLow : k.plotHigh >
                                k.plotLow;
                            k.y = k.high;
                            k._plotY = k.plotY;
                            k.plotY = k.plotHigh;
                            h[e] = k.dataLabel;
                            k.dataLabel = k.dataLabelUpper;
                            k.below = n;
                            p ? c.align || (c.align = n ? "right" : "left") : c.verticalAlign || (c.verticalAlign = n ? "top" : "bottom")
                        }
                    this.options.dataLabels = c;
                    z.drawDataLabels && z.drawDataLabels.apply(this, arguments);
                    for (e = l; e--;)
                        if (k = a[e]) k.dataLabelUpper = k.dataLabel, k.dataLabel = h[e], delete k.dataLabels, k.y = k.low, k.plotY = k._plotY
                }
                if (f.enabled || this._hasPointLabels) {
                    for (e = l; e--;)
                        if (k = a[e]) n = f.inside ? k.plotHigh < k.plotLow : k.plotHigh >
                            k.plotLow, k.below = !n, p ? f.align || (f.align = n ? "left" : "right") : f.verticalAlign || (f.verticalAlign = n ? "bottom" : "top");
                    this.options.dataLabels = f;
                    z.drawDataLabels && z.drawDataLabels.apply(this, arguments)
                }
                if (c.enabled)
                    for (e = l; e--;)
                        if (k = a[e]) k.dataLabels = [k.dataLabelUpper, k.dataLabel].filter(function(c) {
                            return !!c
                        });
                this.options.dataLabels = g
            },
            alignDataLabel: function() {
                B.column.prototype.alignDataLabel.apply(this, arguments)
            },
            drawPoints: function() {
                var a = this.points.length,
                    l;
                z.drawPoints.apply(this, arguments);
                for (l =
                    0; l < a;) {
                    var e = this.points[l];
                    e.origProps = {
                        plotY: e.plotY,
                        plotX: e.plotX,
                        isInside: e.isInside,
                        negative: e.negative,
                        zone: e.zone,
                        y: e.y
                    };
                    e.lowerGraphic = e.graphic;
                    e.graphic = e.upperGraphic;
                    e.plotY = e.plotHigh;
                    h(e.plotHighX) && (e.plotX = e.plotHighX);
                    e.y = e.high;
                    e.negative = e.high < (this.options.threshold || 0);
                    e.zone = this.zones.length && e.getZone();
                    this.chart.polar || (e.isInside = e.isTopInside = "undefined" !== typeof e.plotY && 0 <= e.plotY && e.plotY <= this.yAxis.len && 0 <= e.plotX && e.plotX <= this.xAxis.len);
                    l++
                }
                z.drawPoints.apply(this,
                    arguments);
                for (l = 0; l < a;) e = this.points[l], e.upperGraphic = e.graphic, e.graphic = e.lowerGraphic, b(e, e.origProps), delete e.origProps, l++
            },
            setStackedPoints: d.noop
        }, {
            setState: function() {
                var a = this.state,
                    b = this.series,
                    e = b.chart.polar;
                h(this.plotHigh) || (this.plotHigh = b.yAxis.toPixels(this.high, !0));
                h(this.plotLow) || (this.plotLow = this.plotY = b.yAxis.toPixels(this.low, !0));
                b.stateMarkerGraphic && (b.lowerStateMarkerGraphic = b.stateMarkerGraphic, b.stateMarkerGraphic = b.upperStateMarkerGraphic);
                this.graphic = this.upperGraphic;
                this.plotY = this.plotHigh;
                e && (this.plotX = this.plotHighX);
                l.setState.apply(this, arguments);
                this.state = a;
                this.plotY = this.plotLow;
                this.graphic = this.lowerGraphic;
                e && (this.plotX = this.plotLowX);
                b.stateMarkerGraphic && (b.upperStateMarkerGraphic = b.stateMarkerGraphic, b.stateMarkerGraphic = b.lowerStateMarkerGraphic, b.lowerStateMarkerGraphic = void 0);
                l.setState.apply(this, arguments)
            },
            haloPath: function() {
                var a = this.series.chart.polar,
                    b = [];
                this.plotY = this.plotLow;
                a && (this.plotX = this.plotLowX);
                this.isInside && (b = l.haloPath.apply(this,
                    arguments));
                this.plotY = this.plotHigh;
                a && (this.plotX = this.plotHighX);
                this.isTopInside && (b = b.concat(l.haloPath.apply(this, arguments)));
                return b
            },
            destroyElements: function() {
                ["lowerGraphic", "upperGraphic"].forEach(function(a) {
                    this[a] && (this[a] = this[a].destroy())
                }, this);
                this.graphic = null;
                return l.destroyElements.apply(this, arguments)
            },
            isValid: function() {
                return t(this.low) && t(this.high)
            }
        });
        ""
    });
    C(d, "Series/AreaSplineRangeSeries.js", [d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, a) {
        a = a.seriesType;
        a("areasplinerange", "arearange", null, {
            getPointSpline: d.seriesTypes.spline.prototype.getPointSpline
        });
        ""
    });
    C(d, "Series/ColumnRangeSeries.js", [d["Core/Globals.js"], d["Core/Options.js"], d["Core/Utilities.js"]], function(d, a, g) {
        a = a.defaultOptions;
        var h = g.clamp,
            b = g.merge,
            r = g.pick;
        g = g.seriesType;
        var t = d.noop,
            x = d.seriesTypes.column.prototype;
        g("columnrange", "arearange", b(a.plotOptions.column, a.plotOptions.arearange, {
            pointRange: null,
            marker: null,
            states: {
                hover: {
                    halo: !1
                }
            }
        }), {
            translate: function() {
                var a = this,
                    b =
                    a.yAxis,
                    l = a.xAxis,
                    m = l.startAngleRad,
                    g, e = a.chart,
                    d = a.xAxis.isRadial,
                    t = Math.max(e.chartWidth, e.chartHeight) + 999,
                    k;
                x.translate.apply(a);
                a.points.forEach(function(p) {
                    var c = p.shapeArgs,
                        f = a.options.minPointLength;
                    p.plotHigh = k = h(b.translate(p.high, 0, 1, 0, 1), -t, t);
                    p.plotLow = h(p.plotY, -t, t);
                    var n = k;
                    var u = r(p.rectPlotY, p.plotY) - k;
                    Math.abs(u) < f ? (f -= u, u += f, n -= f / 2) : 0 > u && (u *= -1, n -= u);
                    d ? (g = p.barX + m, p.shapeType = "arc", p.shapeArgs = a.polarArc(n + u, n, g, g + p.pointWidth)) : (c.height = u, c.y = n, p.tooltipPos = e.inverted ? [b.len +
                        b.pos - e.plotLeft - n - u / 2, l.len + l.pos - e.plotTop - c.x - c.width / 2, u
                    ] : [l.left - e.plotLeft + c.x + c.width / 2, b.pos - e.plotTop + n + u / 2, u])
                })
            },
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            drawGraph: t,
            getSymbol: t,
            crispCol: function() {
                return x.crispCol.apply(this, arguments)
            },
            drawPoints: function() {
                return x.drawPoints.apply(this, arguments)
            },
            drawTracker: function() {
                return x.drawTracker.apply(this, arguments)
            },
            getColumnMetrics: function() {
                return x.getColumnMetrics.apply(this, arguments)
            },
            pointAttribs: function() {
                return x.pointAttribs.apply(this,
                    arguments)
            },
            animate: function() {
                return x.animate.apply(this, arguments)
            },
            polarArc: function() {
                return x.polarArc.apply(this, arguments)
            },
            translate3dPoints: function() {
                return x.translate3dPoints.apply(this, arguments)
            },
            translate3dShapes: function() {
                return x.translate3dShapes.apply(this, arguments)
            }
        }, {
            setState: x.pointClass.prototype.setState
        });
        ""
    });
    C(d, "Series/ColumnPyramidSeries.js", [d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, a) {
        var g = a.clamp,
            h = a.pick;
        a = a.seriesType;
        var b = d.seriesTypes.column.prototype;
        a("columnpyramid", "column", {}, {
            translate: function() {
                var a = this,
                    d = a.chart,
                    x = a.options,
                    B = a.dense = 2 > a.closestPointRange * a.xAxis.transA;
                B = a.borderWidth = h(x.borderWidth, B ? 0 : 1);
                var z = a.yAxis,
                    l = x.threshold,
                    m = a.translatedThreshold = z.getThreshold(l),
                    v = h(x.minPointLength, 5),
                    e = a.getColumnMetrics(),
                    y = e.width,
                    w = a.barW = Math.max(y, 1 + 2 * B),
                    k = a.pointXOffset = e.offset;
                d.inverted && (m -= .5);
                x.pointPadding && (w = Math.ceil(w));
                b.translate.apply(a);
                a.points.forEach(function(p) {
                    var c = h(p.yBottom, m),
                        f = 999 + Math.abs(c),
                        n = g(p.plotY, -f, z.len + f);
                    f = p.plotX + k;
                    var u = w / 2,
                        A = Math.min(n, c);
                    c = Math.max(n, c) - A;
                    var q;
                    p.barX = f;
                    p.pointWidth = y;
                    p.tooltipPos = d.inverted ? [z.len + z.pos - d.plotLeft - n, a.xAxis.len - f - u, c] : [f + u, n + z.pos - d.plotTop, c];
                    n = l + (p.total || p.y);
                    "percent" === x.stacking && (n = l + (0 > p.y) ? -100 : 100);
                    n = z.toPixels(n, !0);
                    var b = (q = d.plotHeight - n - (d.plotHeight - m)) ? u * (A - n) / q : 0;
                    var e = q ? u * (A + c - n) / q : 0;
                    q = f - b + u;
                    b = f + b + u;
                    var r = f + e + u;
                    e = f - e + u;
                    var t = A - v;
                    var E = A + c;
                    0 > p.y && (t = A, E = A + c + v);
                    d.inverted && (r = d.plotWidth - A, q = n - (d.plotWidth - m), b = u * (n - r) / q, e = u * (n - (r -
                        c)) / q, q = f + u + b, b = q - 2 * b, r = f - e + u, e = f + e + u, t = A, E = A + c - v, 0 > p.y && (E = A + c + v));
                    p.shapeType = "path";
                    p.shapeArgs = {
                        x: q,
                        y: t,
                        width: b - q,
                        height: c,
                        d: [
                            ["M", q, t],
                            ["L", b, t],
                            ["L", r, E],
                            ["L", e, E],
                            ["Z"]
                        ]
                    }
                })
            }
        });
        ""
    });
    C(d, "Series/GaugeSeries.js", [d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, a) {
        var g = a.clamp,
            h = a.isNumber,
            b = a.merge,
            r = a.pick,
            t = a.pInt;
        a = a.seriesType;
        var x = d.Series,
            B = d.TrackerMixin;
        a("gauge", "line", {
            dataLabels: {
                borderColor: "#cccccc",
                borderRadius: 3,
                borderWidth: 1,
                crop: !1,
                defer: !1,
                enabled: !0,
                verticalAlign: "top",
                y: 15,
                zIndex: 2
            },
            dial: {},
            pivot: {},
            tooltip: {
                headerFormat: ""
            },
            showInLegend: !1
        }, {
            angular: !0,
            directTouch: !0,
            drawGraph: d.noop,
            fixedBox: !0,
            forceDL: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            translate: function() {
                var a = this.yAxis,
                    l = this.options,
                    m = a.center;
                this.generatePoints();
                this.points.forEach(function(d) {
                    var e = b(l.dial, d.dial),
                        v = t(r(e.radius, "80%")) * m[2] / 200,
                        w = t(r(e.baseLength, "70%")) * v / 100,
                        k = t(r(e.rearLength, "10%")) * v / 100,
                        p = e.baseWidth || 3,
                        c = e.topWidth || 1,
                        f = l.overshoot,
                        n = a.startAngleRad +
                        a.translate(d.y, null, null, null, !0);
                    if (h(f) || !1 === l.wrap) f = h(f) ? f / 180 * Math.PI : 0, n = g(n, a.startAngleRad - f, a.endAngleRad + f);
                    n = 180 * n / Math.PI;
                    d.shapeType = "path";
                    d.shapeArgs = {
                        d: e.path || [
                            ["M", -k, -p / 2],
                            ["L", w, -p / 2],
                            ["L", v, -c / 2],
                            ["L", v, c / 2],
                            ["L", w, p / 2],
                            ["L", -k, p / 2],
                            ["Z"]
                        ],
                        translateX: m[0],
                        translateY: m[1],
                        rotation: n
                    };
                    d.plotX = m[0];
                    d.plotY = m[1]
                })
            },
            drawPoints: function() {
                var a = this,
                    l = a.chart,
                    m = a.yAxis.center,
                    h = a.pivot,
                    e = a.options,
                    g = e.pivot,
                    d = l.renderer;
                a.points.forEach(function(k) {
                    var p = k.graphic,
                        c = k.shapeArgs,
                        f =
                        c.d,
                        n = b(e.dial, k.dial);
                    p ? (p.animate(c), c.d = f) : k.graphic = d[k.shapeType](c).attr({
                        rotation: c.rotation,
                        zIndex: 1
                    }).addClass("highcharts-dial").add(a.group);
                    if (!l.styledMode) k.graphic[p ? "animate" : "attr"]({
                        stroke: n.borderColor || "none",
                        "stroke-width": n.borderWidth || 0,
                        fill: n.backgroundColor || "#000000"
                    })
                });
                h ? h.animate({
                    translateX: m[0],
                    translateY: m[1]
                }) : (a.pivot = d.circle(0, 0, r(g.radius, 5)).attr({
                    zIndex: 2
                }).addClass("highcharts-pivot").translate(m[0], m[1]).add(a.group), l.styledMode || a.pivot.attr({
                    "stroke-width": g.borderWidth ||
                        0,
                    stroke: g.borderColor || "#cccccc",
                    fill: g.backgroundColor || "#000000"
                }))
            },
            animate: function(a) {
                var l = this;
                a || l.points.forEach(function(a) {
                    var b = a.graphic;
                    b && (b.attr({
                        rotation: 180 * l.yAxis.startAngleRad / Math.PI
                    }), b.animate({
                        rotation: a.shapeArgs.rotation
                    }, l.options.animation))
                })
            },
            render: function() {
                this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup);
                x.prototype.render.call(this);
                this.group.clip(this.chart.clipRect)
            },
            setData: function(a, l) {
                x.prototype.setData.call(this,
                    a, !1);
                this.processData();
                this.generatePoints();
                r(l, !0) && this.chart.redraw()
            },
            hasData: function() {
                return !!this.points.length
            },
            drawTracker: B && B.drawTrackerPoint
        }, {
            setState: function(a) {
                this.state = a
            }
        });
        ""
    });
    C(d, "Series/BoxPlotSeries.js", [d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, a) {
        var g = a.pick;
        a = a.seriesType;
        var h = d.noop,
            b = d.seriesTypes;
        a("boxplot", "column", {
            threshold: null,
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'
            },
            whiskerLength: "50%",
            fillColor: "#ffffff",
            lineWidth: 1,
            medianWidth: 2,
            whiskerWidth: 2
        }, {
            pointArrayMap: ["low", "q1", "median", "q3", "high"],
            toYData: function(a) {
                return [a.low, a.q1, a.median, a.q3, a.high]
            },
            pointValKey: "high",
            pointAttribs: function() {
                return {}
            },
            drawDataLabels: h,
            translate: function() {
                var a = this.yAxis,
                    h = this.pointArrayMap;
                b.column.prototype.translate.apply(this);
                this.points.forEach(function(b) {
                    h.forEach(function(h) {
                        null !== b[h] && (b[h + "Plot"] = a.translate(b[h], 0, 1, 0, 1))
                    });
                    b.plotHigh = b.highPlot
                })
            },
            drawPoints: function() {
                var a =
                    this,
                    b = a.options,
                    h = a.chart,
                    d = h.renderer,
                    z, l, m, v, e, y, w = 0,
                    k, p, c, f, n = !1 !== a.doQuartiles,
                    u, A = a.options.whiskerLength;
                a.points.forEach(function(q) {
                    var D = q.graphic,
                        I = D ? "animate" : "attr",
                        r = q.shapeArgs,
                        G = {},
                        E = {},
                        F = {},
                        H = {},
                        t = q.color || a.color;
                    "undefined" !== typeof q.plotY && (k = Math.round(r.width), p = Math.floor(r.x), c = p + k, f = Math.round(k / 2), z = Math.floor(n ? q.q1Plot : q.lowPlot), l = Math.floor(n ? q.q3Plot : q.lowPlot), m = Math.floor(q.highPlot), v = Math.floor(q.lowPlot), D || (q.graphic = D = d.g("point").add(a.group), q.stem = d.path().addClass("highcharts-boxplot-stem").add(D),
                        A && (q.whiskers = d.path().addClass("highcharts-boxplot-whisker").add(D)), n && (q.box = d.path(void 0).addClass("highcharts-boxplot-box").add(D)), q.medianShape = d.path(void 0).addClass("highcharts-boxplot-median").add(D)), h.styledMode || (E.stroke = q.stemColor || b.stemColor || t, E["stroke-width"] = g(q.stemWidth, b.stemWidth, b.lineWidth), E.dashstyle = q.stemDashStyle || b.stemDashStyle || b.dashStyle, q.stem.attr(E), A && (F.stroke = q.whiskerColor || b.whiskerColor || t, F["stroke-width"] = g(q.whiskerWidth, b.whiskerWidth, b.lineWidth),
                        F.dashstyle = q.whiskerDashStyle || b.whiskerDashStyle || b.dashStyle, q.whiskers.attr(F)), n && (G.fill = q.fillColor || b.fillColor || t, G.stroke = b.lineColor || t, G["stroke-width"] = b.lineWidth || 0, G.dashstyle = q.boxDashStyle || b.boxDashStyle || b.dashStyle, q.box.attr(G)), H.stroke = q.medianColor || b.medianColor || t, H["stroke-width"] = g(q.medianWidth, b.medianWidth, b.lineWidth), H.dashstyle = q.medianDashStyle || b.medianDashStyle || b.dashStyle, q.medianShape.attr(H)), y = q.stem.strokeWidth() % 2 / 2, w = p + f + y, D = [
                        ["M", w, l],
                        ["L", w, m],
                        ["M",
                            w, z
                        ],
                        ["L", w, v]
                    ], q.stem[I]({
                        d: D
                    }), n && (y = q.box.strokeWidth() % 2 / 2, z = Math.floor(z) + y, l = Math.floor(l) + y, p += y, c += y, D = [
                        ["M", p, l],
                        ["L", p, z],
                        ["L", c, z],
                        ["L", c, l],
                        ["L", p, l],
                        ["Z"]
                    ], q.box[I]({
                        d: D
                    })), A && (y = q.whiskers.strokeWidth() % 2 / 2, m += y, v += y, u = /%$/.test(A) ? f * parseFloat(A) / 100 : A / 2, D = [
                        ["M", w - u, m],
                        ["L", w + u, m],
                        ["M", w - u, v],
                        ["L", w + u, v]
                    ], q.whiskers[I]({
                        d: D
                    })), e = Math.round(q.medianPlot), y = q.medianShape.strokeWidth() % 2 / 2, e += y, D = [
                        ["M", p, e],
                        ["L", c, e]
                    ], q.medianShape[I]({
                        d: D
                    }))
                })
            },
            setStackedPoints: h
        });
        ""
    });
    C(d, "Series/ErrorBarSeries.js", [d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, a) {
        a = a.seriesType;
        var g = d.noop,
            h = d.seriesTypes;
        a("errorbar", "boxplot", {
            color: "#000000",
            grouping: !1,
            linkedTo: ":previous",
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
            },
            whiskerWidth: null
        }, {
            type: "errorbar",
            pointArrayMap: ["low", "high"],
            toYData: function(a) {
                return [a.low, a.high]
            },
            pointValKey: "high",
            doQuartiles: !1,
            drawDataLabels: h.arearange ? function() {
                var a = this.pointValKey;
                h.arearange.prototype.drawDataLabels.call(this);
                this.data.forEach(function(b) {
                    b.y = b[a]
                })
            } : g,
            getColumnMetrics: function() {
                return this.linkedParent && this.linkedParent.columnMetrics || h.column.prototype.getColumnMetrics.call(this)
            }
        });
        ""
    });
    C(d, "Series/WaterfallSeries.js", [d["Core/Axis/Axis.js"], d["Core/Chart/Chart.js"], d["Core/Globals.js"], d["Core/Series/Point.js"], d["Extensions/Stacking.js"], d["Core/Utilities.js"]], function(d, a, g, h, b, r) {
        var t = r.addEvent,
            x = r.arrayMax,
            B = r.arrayMin,
            z = r.correctFloat,
            l = r.isNumber,
            m = r.objectEach,
            v = r.pick;
        r = r.seriesType;
        var e = g.Series,
            y = g.seriesTypes,
            w;
        (function(a) {
            function p() {
                var c = this.waterfall.stacks;
                c && (c.changed = !1, delete c.alreadyChanged)
            }

            function c() {
                var c = this.options.stackLabels;
                c && c.enabled && this.waterfall.stacks && this.waterfall.renderStackTotals()
            }

            function f() {
                for (var c = this.axes, f = this.series, n = f.length; n--;) f[n].options.stacking && (c.forEach(function(c) {
                    c.isXAxis || (c.waterfall.stacks.changed = !0)
                }), n = 0)
            }

            function n() {
                this.waterfall || (this.waterfall = new u(this))
            }
            var u = function() {
                function c(c) {
                    this.axis = c;
                    this.stacks = {
                        changed: !1
                    }
                }
                c.prototype.renderStackTotals = function() {
                    var c = this.axis,
                        f = c.waterfall.stacks,
                        n = c.stacking && c.stacking.stackTotalGroup,
                        a = new b(c, c.options.stackLabels, !1, 0, void 0);
                    this.dummyStackItem = a;
                    m(f, function(c) {
                        m(c, function(c) {
                            a.total = c.stackTotal;
                            c.label && (a.label = c.label);
                            b.prototype.render.call(a, n);
                            c.label = a.label;
                            delete a.label
                        })
                    });
                    a.total = null
                };
                return c
            }();
            a.Composition = u;
            a.compose = function(a, q) {
                t(a, "init", n);
                t(a, "afterBuildStacks",
                    p);
                t(a, "afterRender", c);
                t(q, "beforeRedraw", f)
            }
        })(w || (w = {}));
        r("waterfall", "column", {
            dataLabels: {
                inside: !0
            },
            lineWidth: 1,
            lineColor: "#333333",
            dashStyle: "Dot",
            borderColor: "#333333",
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            }
        }, {
            pointValKey: "y",
            showLine: !0,
            generatePoints: function() {
                var a;
                y.column.prototype.generatePoints.apply(this);
                var b = 0;
                for (a = this.points.length; b < a; b++) {
                    var c = this.points[b];
                    var f = this.processedYData[b];
                    if (c.isIntermediateSum || c.isSum) c.y = z(f)
                }
            },
            translate: function() {
                var a = this.options,
                    b = this.yAxis,
                    c, f = v(a.minPointLength, 5),
                    n = f / 2,
                    u = a.threshold,
                    A = a.stacking,
                    q = b.waterfall.stacks[this.stackKey];
                y.column.prototype.translate.apply(this);
                var l = c = u;
                var m = this.points;
                var h = 0;
                for (a = m.length; h < a; h++) {
                    var e = m[h];
                    var g = this.processedYData[h];
                    var d = e.shapeArgs;
                    var r = [0, g];
                    var t = e.y;
                    if (A) {
                        if (q) {
                            r = q[h];
                            if ("overlap" === A) {
                                var w = r.stackState[r.stateIndex--];
                                w = 0 <= t ? w : w - t;
                                Object.hasOwnProperty.call(r, "absolutePos") && delete r.absolutePos;
                                Object.hasOwnProperty.call(r, "absoluteNeg") && delete r.absoluteNeg
                            } else 0 <=
                                t ? (w = r.threshold + r.posTotal, r.posTotal -= t) : (w = r.threshold + r.negTotal, r.negTotal -= t, w -= t), !r.posTotal && Object.hasOwnProperty.call(r, "absolutePos") && (r.posTotal = r.absolutePos, delete r.absolutePos), !r.negTotal && Object.hasOwnProperty.call(r, "absoluteNeg") && (r.negTotal = r.absoluteNeg, delete r.absoluteNeg);
                            e.isSum || (r.connectorThreshold = r.threshold + r.stackTotal);
                            b.reversed ? (g = 0 <= t ? w - t : w + t, t = w) : (g = w, t = w - t);
                            e.below = g <= v(u, 0);
                            d.y = b.translate(g, 0, 1, 0, 1);
                            d.height = Math.abs(d.y - b.translate(t, 0, 1, 0, 1))
                        }
                        if (t = b.waterfall.dummyStackItem) t.x =
                            h, t.label = q[h].label, t.setOffset(this.pointXOffset || 0, this.barW || 0, this.stackedYNeg[h], this.stackedYPos[h])
                    } else w = Math.max(l, l + t) + r[0], d.y = b.translate(w, 0, 1, 0, 1), e.isSum ? (d.y = b.translate(r[1], 0, 1, 0, 1), d.height = Math.min(b.translate(r[0], 0, 1, 0, 1), b.len) - d.y) : e.isIntermediateSum ? (0 <= t ? (g = r[1] + c, t = c) : (g = c, t = r[1] + c), b.reversed && (g ^= t, t ^= g, g ^= t), d.y = b.translate(g, 0, 1, 0, 1), d.height = Math.abs(d.y - Math.min(b.translate(t, 0, 1, 0, 1), b.len)), c += r[1]) : (d.height = 0 < g ? b.translate(l, 0, 1, 0, 1) - d.y : b.translate(l, 0, 1, 0,
                        1) - b.translate(l - g, 0, 1, 0, 1), l += g, e.below = l < v(u, 0)), 0 > d.height && (d.y += d.height, d.height *= -1);
                    e.plotY = d.y = Math.round(d.y) - this.borderWidth % 2 / 2;
                    d.height = Math.max(Math.round(d.height), .001);
                    e.yBottom = d.y + d.height;
                    d.height <= f && !e.isNull ? (d.height = f, d.y -= n, e.plotY = d.y, e.minPointLengthOffset = 0 > e.y ? -n : n) : (e.isNull && (d.width = 0), e.minPointLengthOffset = 0);
                    d = e.plotY + (e.negative ? d.height : 0);
                    this.chart.inverted ? e.tooltipPos[0] = b.len - d : e.tooltipPos[1] = d
                }
            },
            processData: function(a) {
                var b = this.options,
                    c = this.yData,
                    f = b.data,
                    n = c.length,
                    u = b.threshold || 0,
                    A, q, l, k, m;
                for (m = q = A = l = k = 0; m < n; m++) {
                    var h = c[m];
                    var g = f && f[m] ? f[m] : {};
                    "sum" === h || g.isSum ? c[m] = z(q) : "intermediateSum" === h || g.isIntermediateSum ? (c[m] = z(A), A = 0) : (q += h, A += h);
                    l = Math.min(q, l);
                    k = Math.max(q, k)
                }
                e.prototype.processData.call(this, a);
                b.stacking || (this.dataMin = l + u, this.dataMax = k)
            },
            toYData: function(a) {
                return a.isSum ? "sum" : a.isIntermediateSum ? "intermediateSum" : a.y
            },
            updateParallelArrays: function(a, b) {
                e.prototype.updateParallelArrays.call(this, a, b);
                if ("sum" === this.yData[0] ||
                    "intermediateSum" === this.yData[0]) this.yData[0] = null
            },
            pointAttribs: function(a, b) {
                var c = this.options.upColor;
                c && !a.options.color && (a.color = 0 < a.y ? c : null);
                a = y.column.prototype.pointAttribs.call(this, a, b);
                delete a.dashstyle;
                return a
            },
            getGraphPath: function() {
                return [
                    ["M", 0, 0]
                ]
            },
            getCrispPath: function() {
                var a = this.data,
                    b = this.yAxis,
                    c = a.length,
                    f = Math.round(this.graph.strokeWidth()) % 2 / 2,
                    n = Math.round(this.borderWidth) % 2 / 2,
                    u = this.xAxis.reversed,
                    l = this.yAxis.reversed,
                    q = this.options.stacking,
                    m = [],
                    e;
                for (e = 1; e < c; e++) {
                    var h =
                        a[e].shapeArgs;
                    var g = a[e - 1];
                    var d = a[e - 1].shapeArgs;
                    var r = b.waterfall.stacks[this.stackKey];
                    var t = 0 < g.y ? -d.height : 0;
                    r && d && h && (r = r[e - 1], q ? (r = r.connectorThreshold, t = Math.round(b.translate(r, 0, 1, 0, 1) + (l ? t : 0)) - f) : t = d.y + g.minPointLengthOffset + n - f, m.push(["M", (d.x || 0) + (u ? 0 : d.width || 0), t], ["L", (h.x || 0) + (u ? h.width || 0 : 0), t]));
                    !q && m.length && d && (0 > g.y && !l || 0 < g.y && l) && (m[m.length - 2][2] += d.height, m[m.length - 1][2] += d.height)
                }
                return m
            },
            drawGraph: function() {
                e.prototype.drawGraph.call(this);
                this.graph.attr({
                    d: this.getCrispPath()
                })
            },
            setStackedPoints: function() {
                function a(c, f, n, a) {
                    if (B)
                        for (n; n < B; n++) v.stackState[n] += a;
                    else v.stackState[0] = c, B = v.stackState.length;
                    v.stackState.push(v.stackState[B - 1] + f)
                }
                var b = this.options,
                    c = this.yAxis.waterfall.stacks,
                    f = b.threshold,
                    n = f || 0,
                    u = n,
                    l = this.stackKey,
                    q = this.xData,
                    m = q.length,
                    e, h, g;
                this.yAxis.stacking.usePercentage = !1;
                var d = h = g = n;
                if (this.visible || !this.chart.options.chart.ignoreHiddenSeries) {
                    var r = c.changed;
                    (e = c.alreadyChanged) && 0 > e.indexOf(l) && (r = !0);
                    c[l] || (c[l] = {});
                    e = c[l];
                    for (var t = 0; t < m; t++) {
                        var w =
                            q[t];
                        if (!e[w] || r) e[w] = {
                            negTotal: 0,
                            posTotal: 0,
                            stackTotal: 0,
                            threshold: 0,
                            stateIndex: 0,
                            stackState: [],
                            label: r && e[w] ? e[w].label : void 0
                        };
                        var v = e[w];
                        var y = this.yData[t];
                        0 <= y ? v.posTotal += y : v.negTotal += y;
                        var z = b.data[t];
                        w = v.absolutePos = v.posTotal;
                        var x = v.absoluteNeg = v.negTotal;
                        v.stackTotal = w + x;
                        var B = v.stackState.length;
                        z && z.isIntermediateSum ? (a(g, h, 0, g), g = h, h = f, n ^= u, u ^= n, n ^= u) : z && z.isSum ? (a(f, d, B), n = f) : (a(n, y, 0, d), z && (d += y, h += y));
                        v.stateIndex++;
                        v.threshold = n;
                        n += v.stackTotal
                    }
                    c.changed = !1;
                    c.alreadyChanged || (c.alreadyChanged = []);
                    c.alreadyChanged.push(l)
                }
            },
            getExtremes: function() {
                var a = this.options.stacking;
                if (a) {
                    var b = this.yAxis;
                    b = b.waterfall.stacks;
                    var c = this.stackedYNeg = [];
                    var f = this.stackedYPos = [];
                    "overlap" === a ? m(b[this.stackKey], function(n) {
                        c.push(B(n.stackState));
                        f.push(x(n.stackState))
                    }) : m(b[this.stackKey], function(n) {
                        c.push(n.negTotal + n.threshold);
                        f.push(n.posTotal + n.threshold)
                    });
                    return {
                        dataMin: B(c),
                        dataMax: x(f)
                    }
                }
                return {
                    dataMin: this.dataMin,
                    dataMax: this.dataMax
                }
            }
        }, {
            getClassName: function() {
                var a = h.prototype.getClassName.call(this);
                this.isSum ? a += " highcharts-sum" : this.isIntermediateSum && (a += " highcharts-intermediate-sum");
                return a
            },
            isValid: function() {
                return l(this.y) || this.isSum || !!this.isIntermediateSum
            }
        });
        "";
        w.compose(d, a);
        return w
    });
    C(d, "Series/PolygonSeries.js", [d["Core/Globals.js"], d["Mixins/LegendSymbol.js"], d["Core/Utilities.js"]], function(d, a, g) {
        g = g.seriesType;
        var h = d.Series,
            b = d.seriesTypes;
        g("polygon", "scatter", {
            marker: {
                enabled: !1,
                states: {
                    hover: {
                        enabled: !1
                    }
                }
            },
            stickyTracking: !1,
            tooltip: {
                followPointer: !0,
                pointFormat: ""
            },
            trackByArea: !0
        }, {
            type: "polygon",
            getGraphPath: function() {
                for (var a = h.prototype.getGraphPath.call(this), b = a.length + 1; b--;)(b === a.length || "M" === a[b][0]) && 0 < b && a.splice(b, 0, ["Z"]);
                return this.areaPath = a
            },
            drawGraph: function() {
                this.options.fillColor = this.color;
                b.area.prototype.drawGraph.call(this)
            },
            drawLegendSymbol: a.drawRectangle,
            drawTracker: h.prototype.drawTracker,
            setStackedPoints: d.noop
        });
        ""
    });
    C(d, "Series/Bubble/BubbleLegend.js", [d["Core/Chart/Chart.js"], d["Core/Color.js"], d["Core/Globals.js"], d["Core/Legend.js"],
        d["Core/Utilities.js"]
    ], function(d, a, g, h, b) {
        var r = a.parse;
        a = b.addEvent;
        var t = b.arrayMax,
            x = b.arrayMin,
            B = b.isNumber,
            z = b.merge,
            l = b.objectEach,
            m = b.pick,
            v = b.setOptions,
            e = b.stableSort,
            y = b.wrap;
        "";
        var w = g.Series,
            k = g.noop;
        v({
            legend: {
                bubbleLegend: {
                    borderColor: void 0,
                    borderWidth: 2,
                    className: void 0,
                    color: void 0,
                    connectorClassName: void 0,
                    connectorColor: void 0,
                    connectorDistance: 60,
                    connectorWidth: 1,
                    enabled: !1,
                    labels: {
                        className: void 0,
                        allowOverlap: !1,
                        format: "",
                        formatter: void 0,
                        align: "right",
                        style: {
                            fontSize: 10,
                            color: void 0
                        },
                        x: 0,
                        y: 0
                    },
                    maxSize: 60,
                    minSize: 10,
                    legendIndex: 0,
                    ranges: {
                        value: void 0,
                        borderColor: void 0,
                        color: void 0,
                        connectorColor: void 0
                    },
                    sizeBy: "area",
                    sizeByAbsoluteValue: !1,
                    zIndex: 1,
                    zThreshold: 0
                }
            }
        });
        v = function() {
            function a(c, f) {
                this.options = this.symbols = this.visible = this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight = this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0;
                this.setState = k;
                this.init(c, f)
            }
            a.prototype.init = function(c, f) {
                this.options =
                    c;
                this.visible = !0;
                this.chart = f.chart;
                this.legend = f
            };
            a.prototype.addToLegend = function(c) {
                c.splice(this.options.legendIndex, 0, this)
            };
            a.prototype.drawLegendSymbol = function(c) {
                var f = this.chart,
                    a = this.options,
                    b = m(c.options.itemDistance, 20),
                    l = a.ranges;
                var q = a.connectorDistance;
                this.fontMetrics = f.renderer.fontMetrics(a.labels.style.fontSize.toString() + "px");
                l && l.length && B(l[0].value) ? (e(l, function(c, f) {
                        return f.value - c.value
                    }), this.ranges = l, this.setOptions(), this.render(), f = this.getMaxLabelSize(), l = this.ranges[0].radius,
                    c = 2 * l, q = q - l + f.width, q = 0 < q ? q : 0, this.maxLabel = f, this.movementX = "left" === a.labels.align ? q : 0, this.legendItemWidth = c + q + b, this.legendItemHeight = c + this.fontMetrics.h / 2) : c.options.bubbleLegend.autoRanges = !0
            };
            a.prototype.setOptions = function() {
                var c = this.ranges,
                    f = this.options,
                    a = this.chart.series[f.seriesIndex],
                    b = this.legend.baseline,
                    l = {
                        "z-index": f.zIndex,
                        "stroke-width": f.borderWidth
                    },
                    q = {
                        "z-index": f.zIndex,
                        "stroke-width": f.connectorWidth
                    },
                    e = this.getLabelStyles(),
                    h = a.options.marker.fillOpacity,
                    g = this.chart.styledMode;
                c.forEach(function(n, u) {
                    g || (l.stroke = m(n.borderColor, f.borderColor, a.color), l.fill = m(n.color, f.color, 1 !== h ? r(a.color).setOpacity(h).get("rgba") : a.color), q.stroke = m(n.connectorColor, f.connectorColor, a.color));
                    c[u].radius = this.getRangeRadius(n.value);
                    c[u] = z(c[u], {
                        center: c[0].radius - c[u].radius + b
                    });
                    g || z(!0, c[u], {
                        bubbleStyle: z(!1, l),
                        connectorStyle: z(!1, q),
                        labelStyle: e
                    })
                }, this)
            };
            a.prototype.getLabelStyles = function() {
                var c = this.options,
                    f = {},
                    a = "left" === c.labels.align,
                    b = this.legend.options.rtl;
                l(c.labels.style,
                    function(c, a) {
                        "color" !== a && "fontSize" !== a && "z-index" !== a && (f[a] = c)
                    });
                return z(!1, f, {
                    "font-size": c.labels.style.fontSize,
                    fill: m(c.labels.style.color, "#000000"),
                    "z-index": c.zIndex,
                    align: b || a ? "right" : "left"
                })
            };
            a.prototype.getRangeRadius = function(c) {
                var f = this.options;
                return this.chart.series[this.options.seriesIndex].getRadius.call(this, f.ranges[f.ranges.length - 1].value, f.ranges[0].value, f.minSize, f.maxSize, c)
            };
            a.prototype.render = function() {
                var c = this.chart.renderer,
                    f = this.options.zThreshold;
                this.symbols ||
                    (this.symbols = {
                        connectors: [],
                        bubbleItems: [],
                        labels: []
                    });
                this.legendSymbol = c.g("bubble-legend");
                this.legendItem = c.g("bubble-legend-item");
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function(c) {
                    c.value >= f && this.renderRange(c)
                }, this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels()
            };
            a.prototype.renderRange = function(c) {
                var f = this.options,
                    a = f.labels,
                    b = this.chart.renderer,
                    l = this.symbols,
                    q = l.labels,
                    m = c.center,
                    e = Math.abs(c.radius),
                    h = f.connectorDistance || 0,
                    g = a.align,
                    k = a.style.fontSize;
                h = this.legend.options.rtl || "left" === g ? -h : h;
                a = f.connectorWidth;
                var d = this.ranges[0].radius || 0,
                    p = m - e - f.borderWidth / 2 + a / 2;
                k = k / 2 - (this.fontMetrics.h - k) / 2;
                var r = b.styledMode;
                "center" === g && (h = 0, f.connectorDistance = 0, c.labelStyle.align = "center");
                g = p + f.labels.y;
                var t = d + h + f.labels.x;
                l.bubbleItems.push(b.circle(d, m + ((p % 1 ? 1 : .5) - (a % 2 ? 0 : .5)), e).attr(r ? {} : c.bubbleStyle).addClass((r ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " +
                    (f.className || "")).add(this.legendSymbol));
                l.connectors.push(b.path(b.crispLine([
                    ["M", d, p],
                    ["L", d + h, p]
                ], f.connectorWidth)).attr(r ? {} : c.connectorStyle).addClass((r ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (f.connectorClassName || "")).add(this.legendSymbol));
                c = b.text(this.formatLabel(c), t, g + k).attr(r ? {} : c.labelStyle).addClass("highcharts-bubble-legend-labels " + (f.labels.className || "")).add(this.legendSymbol);
                q.push(c);
                c.placed = !0;
                c.alignAttr = {
                    x: t,
                    y: g +
                        k
                }
            };
            a.prototype.getMaxLabelSize = function() {
                var c, f;
                this.symbols.labels.forEach(function(a) {
                    f = a.getBBox(!0);
                    c = c ? f.width > c.width ? f : c : f
                });
                return c || {}
            };
            a.prototype.formatLabel = function(c) {
                var f = this.options,
                    a = f.labels.formatter;
                f = f.labels.format;
                var l = this.chart.numberFormatter;
                return f ? b.format(f, c) : a ? a.call(c) : l(c.value, 1)
            };
            a.prototype.hideOverlappingLabels = function() {
                var c = this.chart,
                    f = this.symbols;
                !this.options.labels.allowOverlap && f && (c.hideOverlappingLabels(f.labels), f.labels.forEach(function(c,
                    a) {
                    c.newOpacity ? c.newOpacity !== c.oldOpacity && f.connectors[a].show() : f.connectors[a].hide()
                }))
            };
            a.prototype.getRanges = function() {
                var c = this.legend.bubbleLegend,
                    f = c.options.ranges,
                    a, b = Number.MAX_VALUE,
                    l = -Number.MAX_VALUE;
                c.chart.series.forEach(function(c) {
                    c.isBubble && !c.ignoreSeries && (a = c.zData.filter(B), a.length && (b = m(c.options.zMin, Math.min(b, Math.max(x(a), !1 === c.options.displayNegative ? c.options.zThreshold : -Number.MAX_VALUE))), l = m(c.options.zMax, Math.max(l, t(a)))))
                });
                var q = b === l ? [{
                    value: l
                }] : [{
                        value: b
                    },
                    {
                        value: (b + l) / 2
                    }, {
                        value: l,
                        autoRanges: !0
                    }
                ];
                f.length && f[0].radius && q.reverse();
                q.forEach(function(c, a) {
                    f && f[a] && (q[a] = z(!1, f[a], c))
                });
                return q
            };
            a.prototype.predictBubbleSizes = function() {
                var c = this.chart,
                    f = this.fontMetrics,
                    a = c.legend.options,
                    b = "horizontal" === a.layout,
                    l = b ? c.legend.lastLineHeight : 0,
                    q = c.plotSizeX,
                    m = c.plotSizeY,
                    e = c.series[this.options.seriesIndex];
                c = Math.ceil(e.minPxSize);
                var h = Math.ceil(e.maxPxSize);
                e = e.options.maxSize;
                var g = Math.min(m, q);
                if (a.floating || !/%$/.test(e)) f = h;
                else if (e = parseFloat(e),
                    f = (g + l - f.h / 2) * e / 100 / (e / 100 + 1), b && m - f >= q || !b && q - f >= m) f = h;
                return [c, Math.ceil(f)]
            };
            a.prototype.updateRanges = function(c, a) {
                var f = this.legend.options.bubbleLegend;
                f.minSize = c;
                f.maxSize = a;
                f.ranges = this.getRanges()
            };
            a.prototype.correctSizes = function() {
                var c = this.legend,
                    a = this.chart.series[this.options.seriesIndex];
                1 < Math.abs(Math.ceil(a.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, a.maxPxSize), c.render())
            };
            return a
        }();
        a(h, "afterGetAllItems", function(a) {
            var c = this.bubbleLegend,
                f = this.options,
                n = f.bubbleLegend,
                b = this.chart.getVisibleBubbleSeriesIndex();
            c && c.ranges && c.ranges.length && (n.ranges.length && (n.autoRanges = !!n.ranges[0].autoRanges), this.destroyItem(c));
            0 <= b && f.enabled && n.enabled && (n.seriesIndex = b, this.bubbleLegend = new g.BubbleLegend(n, this), this.bubbleLegend.addToLegend(a.allItems))
        });
        d.prototype.getVisibleBubbleSeriesIndex = function() {
            for (var a = this.series, c = 0; c < a.length;) {
                if (a[c] && a[c].isBubble && a[c].visible && a[c].zData.length) return c;
                c++
            }
            return -1
        };
        h.prototype.getLinesHeights =
            function() {
                var a = this.allItems,
                    c = [],
                    f = a.length,
                    n, b = 0;
                for (n = 0; n < f; n++)
                    if (a[n].legendItemHeight && (a[n].itemHeight = a[n].legendItemHeight), a[n] === a[f - 1] || a[n + 1] && a[n]._legendItemPos[1] !== a[n + 1]._legendItemPos[1]) {
                        c.push({
                            height: 0
                        });
                        var l = c[c.length - 1];
                        for (b; b <= n; b++) a[b].itemHeight > l.height && (l.height = a[b].itemHeight);
                        l.step = n
                    }
                return c
            };
        h.prototype.retranslateItems = function(a) {
            var c, f, n, b = this.options.rtl,
                l = 0;
            this.allItems.forEach(function(q, u) {
                c = q.legendGroup.translateX;
                f = q._legendItemPos[1];
                if ((n = q.movementX) ||
                    b && q.ranges) n = b ? c - q.options.maxSize / 2 : c + n, q.legendGroup.attr({
                    translateX: n
                });
                u > a[l].step && l++;
                q.legendGroup.attr({
                    translateY: Math.round(f + a[l].height / 2)
                });
                q._legendItemPos[1] = f + a[l].height / 2
            })
        };
        a(w, "legendItemClick", function() {
            var a = this.chart,
                c = this.visible,
                f = this.chart.legend;
            f && f.bubbleLegend && (this.visible = !c, this.ignoreSeries = c, a = 0 <= a.getVisibleBubbleSeriesIndex(), f.bubbleLegend.visible !== a && (f.update({
                bubbleLegend: {
                    enabled: a
                }
            }), f.bubbleLegend.visible = a), this.visible = c)
        });
        y(d.prototype, "drawChartBox",
            function(a, c, f) {
                var n = this.legend,
                    b = 0 <= this.getVisibleBubbleSeriesIndex();
                if (n && n.options.enabled && n.bubbleLegend && n.options.bubbleLegend.autoRanges && b) {
                    var e = n.bubbleLegend.options;
                    b = n.bubbleLegend.predictBubbleSizes();
                    n.bubbleLegend.updateRanges(b[0], b[1]);
                    e.placed || (n.group.placed = !1, n.allItems.forEach(function(c) {
                        c.legendGroup.translateY = null
                    }));
                    n.render();
                    this.getMargins();
                    this.axes.forEach(function(c) {
                        c.visible && c.render();
                        e.placed || (c.setScale(), c.updateNames(), l(c.ticks, function(c) {
                            c.isNew = !0;
                            c.isNewLabel = !0
                        }))
                    });
                    e.placed = !0;
                    this.getMargins();
                    a.call(this, c, f);
                    n.bubbleLegend.correctSizes();
                    n.retranslateItems(n.getLinesHeights())
                } else a.call(this, c, f), n && n.options.enabled && n.bubbleLegend && (n.render(), n.retranslateItems(n.getLinesHeights()))
            });
        g.BubbleLegend = v;
        return g.BubbleLegend
    });
    C(d, "Series/Bubble/BubbleSeries.js", [d["Core/Globals.js"], d["Core/Color.js"], d["Core/Series/Point.js"], d["Core/Utilities.js"]], function(d, a, g, h) {
        var b = a.parse,
            r = h.arrayMax,
            t = h.arrayMin,
            x = h.clamp,
            B = h.extend,
            z = h.isNumber,
            l = h.pick,
            m = h.pInt;
        a = h.seriesType;
        h = d.Axis;
        var v = d.noop,
            e = d.Series,
            y = d.seriesTypes;
        a("bubble", "scatter", {
            dataLabels: {
                formatter: function() {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            animationLimit: 250,
            marker: {
                lineColor: null,
                lineWidth: 1,
                fillOpacity: .5,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: "circle"
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            isBubble: !0,
            pointAttribs: function(a, l) {
                var m = this.options.marker.fillOpacity;
                a = e.prototype.pointAttribs.call(this, a, l);
                1 !== m && (a.fill = b(a.fill).setOpacity(m).get("rgba"));
                return a
            },
            getRadii: function(a, b, l) {
                var c = this.zData,
                    f = this.yData,
                    n = l.minPxSize,
                    e = l.maxPxSize,
                    m = [];
                var q = 0;
                for (l = c.length; q < l; q++) {
                    var h = c[q];
                    m.push(this.getRadius(a, b, n,
                        e, h, f[q]))
                }
                this.radii = m
            },
            getRadius: function(a, b, l, c, f, n) {
                var e = this.options,
                    m = "width" !== e.sizeBy,
                    q = e.zThreshold,
                    h = b - a,
                    g = .5;
                if (null === n || null === f) return null;
                if (z(f)) {
                    e.sizeByAbsoluteValue && (f = Math.abs(f - q), h = Math.max(b - q, Math.abs(a - q)), a = 0);
                    if (f < a) return l / 2 - 1;
                    0 < h && (g = (f - a) / h)
                }
                m && 0 <= g && (g = Math.sqrt(g));
                return Math.ceil(l + g * (c - l)) / 2
            },
            animate: function(a) {
                !a && this.points.length < this.options.animationLimit && this.points.forEach(function(a) {
                    var b = a.graphic;
                    b && b.width && (this.hasRendered || b.attr({
                        x: a.plotX,
                        y: a.plotY,
                        width: 1,
                        height: 1
                    }), b.animate(this.markerAttribs(a), this.options.animation))
                }, this)
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            translate: function() {
                var a, b = this.data,
                    l = this.radii;
                y.scatter.prototype.translate.call(this);
                for (a = b.length; a--;) {
                    var c = b[a];
                    var f = l ? l[a] : 0;
                    z(f) && f >= this.minPxSize / 2 ? (c.marker = B(c.marker, {
                        radius: f,
                        width: 2 * f,
                        height: 2 * f
                    }), c.dlBox = {
                        x: c.plotX - f,
                        y: c.plotY - f,
                        width: 2 * f,
                        height: 2 * f
                    }) : c.shapeArgs = c.plotY = c.dlBox = void 0
                }
            },
            alignDataLabel: y.column.prototype.alignDataLabel,
            buildKDTree: v,
            applyZones: v
        }, {
            haloPath: function(a) {
                return g.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
            },
            ttBelow: !1
        });
        h.prototype.beforePadding = function() {
            var a = this,
                b = this.len,
                e = this.chart,
                c = 0,
                f = b,
                n = this.isXAxis,
                u = n ? "xData" : "yData",
                h = this.min,
                q = {},
                g = Math.min(e.plotWidth, e.plotHeight),
                d = Number.MAX_VALUE,
                v = -Number.MAX_VALUE,
                y = this.max - h,
                B = b / y,
                F = [];
            this.series.forEach(function(c) {
                var f = c.options;
                !c.bubblePadding || !c.visible && e.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, F.push(c), n && (["minSize", "maxSize"].forEach(function(c) {
                    var a = f[c],
                        n = /%$/.test(a);
                    a = m(a);
                    q[c] = n ? g * a / 100 : a
                }), c.minPxSize = q.minSize, c.maxPxSize = Math.max(q.maxSize, q.minSize), c = c.zData.filter(z), c.length && (d = l(f.zMin, x(t(c), !1 === f.displayNegative ? f.zThreshold : -Number.MAX_VALUE, d)), v = l(f.zMax, Math.max(v, r(c))))))
            });
            F.forEach(function(b) {
                var l = b[u],
                    q = l.length;
                n && b.getRadii(d, v, b);
                if (0 < y)
                    for (; q--;)
                        if (z(l[q]) && a.dataMin <= l[q] && l[q] <= a.max) {
                            var e = b.radii ? b.radii[q] : 0;
                            c = Math.min((l[q] - h) * B - e, c);
                            f = Math.max((l[q] -
                                h) * B + e, f)
                        }
            });
            F.length && 0 < y && !this.logarithmic && (f -= b, B *= (b + Math.max(0, c) - Math.min(f, b)) / b, [
                ["min", "userMin", c],
                ["max", "userMax", f]
            ].forEach(function(c) {
                "undefined" === typeof l(a.options[c[0]], a[c[1]]) && (a[c[0]] += c[2] / B)
            }))
        };
        ""
    });
    C(d, "Series/Networkgraph/DraggableNodes.js", [d["Core/Chart/Chart.js"], d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, a, g) {
        var h = g.addEvent;
        a.dragNodesMixin = {
            onMouseDown: function(a, h) {
                h = this.chart.pointer.normalize(h);
                a.fixedPosition = {
                    chartX: h.chartX,
                    chartY: h.chartY,
                    plotX: a.plotX,
                    plotY: a.plotY
                };
                a.inDragMode = !0
            },
            onMouseMove: function(a, h) {
                if (a.fixedPosition && a.inDragMode) {
                    var b = this.chart;
                    h = b.pointer.normalize(h);
                    var g = a.fixedPosition.chartX - h.chartX,
                        d = a.fixedPosition.chartY - h.chartY;
                    h = b.graphLayoutsLookup;
                    if (5 < Math.abs(g) || 5 < Math.abs(d)) g = a.fixedPosition.plotX - g, d = a.fixedPosition.plotY - d, b.isInsidePlot(g, d) && (a.plotX = g, a.plotY = d, a.hasDragged = !0, this.redrawHalo(a), h.forEach(function(a) {
                        a.restartSimulation()
                    }))
                }
            },
            onMouseUp: function(a, h) {
                a.fixedPosition && a.hasDragged &&
                    (this.layout.enableSimulation ? this.layout.start() : this.chart.redraw(), a.inDragMode = a.hasDragged = !1, this.options.fixedDraggable || delete a.fixedPosition)
            },
            redrawHalo: function(a) {
                a && this.halo && this.halo.attr({
                    d: a.haloPath(this.options.states.hover.halo.size)
                })
            }
        };
        h(d, "load", function() {
            var a = this,
                g, d, x;
            a.container && (g = h(a.container, "mousedown", function(b) {
                var g = a.hoverPoint;
                g && g.series && g.series.hasDraggableNodes && g.series.options.draggable && (g.series.onMouseDown(g, b), d = h(a.container, "mousemove", function(a) {
                    return g &&
                        g.series && g.series.onMouseMove(g, a)
                }), x = h(a.container.ownerDocument, "mouseup", function(a) {
                    d();
                    x();
                    return g && g.series && g.series.onMouseUp(g, a)
                }))
            }));
            h(a, "destroy", function() {
                g()
            })
        })
    });
    C(d, "Series/Networkgraph/Integrations.js", [d["Core/Globals.js"]], function(d) {
        d.networkgraphIntegrations = {
            verlet: {
                attractiveForceFunction: function(a, g) {
                    return (g - a) / a
                },
                repulsiveForceFunction: function(a, g) {
                    return (g - a) / a * (g > a ? 1 : 0)
                },
                barycenter: function() {
                    var a = this.options.gravitationalConstant,
                        g = this.barycenter.xFactor,
                        h =
                        this.barycenter.yFactor;
                    g = (g - (this.box.left + this.box.width) / 2) * a;
                    h = (h - (this.box.top + this.box.height) / 2) * a;
                    this.nodes.forEach(function(a) {
                        a.fixedPosition || (a.plotX -= g / a.mass / a.degree, a.plotY -= h / a.mass / a.degree)
                    })
                },
                repulsive: function(a, g, h) {
                    g = g * this.diffTemperature / a.mass / a.degree;
                    a.fixedPosition || (a.plotX += h.x * g, a.plotY += h.y * g)
                },
                attractive: function(a, g, h) {
                    var b = a.getMass(),
                        d = -h.x * g * this.diffTemperature;
                    g = -h.y * g * this.diffTemperature;
                    a.fromNode.fixedPosition || (a.fromNode.plotX -= d * b.fromNode / a.fromNode.degree,
                        a.fromNode.plotY -= g * b.fromNode / a.fromNode.degree);
                    a.toNode.fixedPosition || (a.toNode.plotX += d * b.toNode / a.toNode.degree, a.toNode.plotY += g * b.toNode / a.toNode.degree)
                },
                integrate: function(a, g) {
                    var h = -a.options.friction,
                        b = a.options.maxSpeed,
                        d = (g.plotX + g.dispX - g.prevX) * h;
                    h *= g.plotY + g.dispY - g.prevY;
                    var t = Math.abs,
                        x = t(d) / (d || 1);
                    t = t(h) / (h || 1);
                    d = x * Math.min(b, Math.abs(d));
                    h = t * Math.min(b, Math.abs(h));
                    g.prevX = g.plotX + g.dispX;
                    g.prevY = g.plotY + g.dispY;
                    g.plotX += d;
                    g.plotY += h;
                    g.temperature = a.vectorLength({
                        x: d,
                        y: h
                    })
                },
                getK: function(a) {
                    return Math.pow(a.box.width * a.box.height / a.nodes.length, .5)
                }
            },
            euler: {
                attractiveForceFunction: function(a, g) {
                    return a * a / g
                },
                repulsiveForceFunction: function(a, g) {
                    return g * g / a
                },
                barycenter: function() {
                    var a = this.options.gravitationalConstant,
                        g = this.barycenter.xFactor,
                        h = this.barycenter.yFactor;
                    this.nodes.forEach(function(b) {
                        if (!b.fixedPosition) {
                            var d = b.getDegree();
                            d *= 1 + d / 2;
                            b.dispX += (g - b.plotX) * a * d / b.degree;
                            b.dispY += (h - b.plotY) * a * d / b.degree
                        }
                    })
                },
                repulsive: function(a, g, h, b) {
                    a.dispX += h.x / b * g /
                        a.degree;
                    a.dispY += h.y / b * g / a.degree
                },
                attractive: function(a, g, h, b) {
                    var d = a.getMass(),
                        t = h.x / b * g;
                    g *= h.y / b;
                    a.fromNode.fixedPosition || (a.fromNode.dispX -= t * d.fromNode / a.fromNode.degree, a.fromNode.dispY -= g * d.fromNode / a.fromNode.degree);
                    a.toNode.fixedPosition || (a.toNode.dispX += t * d.toNode / a.toNode.degree, a.toNode.dispY += g * d.toNode / a.toNode.degree)
                },
                integrate: function(a, d) {
                    d.dispX += d.dispX * a.options.friction;
                    d.dispY += d.dispY * a.options.friction;
                    var h = d.temperature = a.vectorLength({
                        x: d.dispX,
                        y: d.dispY
                    });
                    0 !== h &&
                        (d.plotX += d.dispX / h * Math.min(Math.abs(d.dispX), a.temperature), d.plotY += d.dispY / h * Math.min(Math.abs(d.dispY), a.temperature))
                },
                getK: function(a) {
                    return Math.pow(a.box.width * a.box.height / a.nodes.length, .3)
                }
            }
        }
    });
    C(d, "Series/Networkgraph/QuadTree.js", [d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, a) {
        a = a.extend;
        var g = d.QuadTreeNode = function(a) {
            this.box = a;
            this.boxSize = Math.min(a.width, a.height);
            this.nodes = [];
            this.body = this.isInternal = !1;
            this.isEmpty = !0
        };
        a(g.prototype, {
            insert: function(a, b) {
                this.isInternal ?
                    this.nodes[this.getBoxPosition(a)].insert(a, b - 1) : (this.isEmpty = !1, this.body ? b ? (this.isInternal = !0, this.divideBox(), !0 !== this.body && (this.nodes[this.getBoxPosition(this.body)].insert(this.body, b - 1), this.body = !0), this.nodes[this.getBoxPosition(a)].insert(a, b - 1)) : (b = new g({
                        top: a.plotX,
                        left: a.plotY,
                        width: .1,
                        height: .1
                    }), b.body = a, b.isInternal = !1, this.nodes.push(b)) : (this.isInternal = !1, this.body = a))
            },
            updateMassAndCenter: function() {
                var a = 0,
                    b = 0,
                    d = 0;
                this.isInternal ? (this.nodes.forEach(function(h) {
                    h.isEmpty ||
                        (a += h.mass, b += h.plotX * h.mass, d += h.plotY * h.mass)
                }), b /= a, d /= a) : this.body && (a = this.body.mass, b = this.body.plotX, d = this.body.plotY);
                this.mass = a;
                this.plotX = b;
                this.plotY = d
            },
            divideBox: function() {
                var a = this.box.width / 2,
                    b = this.box.height / 2;
                this.nodes[0] = new g({
                    left: this.box.left,
                    top: this.box.top,
                    width: a,
                    height: b
                });
                this.nodes[1] = new g({
                    left: this.box.left + a,
                    top: this.box.top,
                    width: a,
                    height: b
                });
                this.nodes[2] = new g({
                    left: this.box.left + a,
                    top: this.box.top + b,
                    width: a,
                    height: b
                });
                this.nodes[3] = new g({
                    left: this.box.left,
                    top: this.box.top + b,
                    width: a,
                    height: b
                })
            },
            getBoxPosition: function(a) {
                var b = a.plotY < this.box.top + this.box.height / 2;
                return a.plotX < this.box.left + this.box.width / 2 ? b ? 0 : 3 : b ? 1 : 2
            }
        });
        d = d.QuadTree = function(a, b, d, t) {
            this.box = {
                left: a,
                top: b,
                width: d,
                height: t
            };
            this.maxDepth = 25;
            this.root = new g(this.box, "0");
            this.root.isInternal = !0;
            this.root.isRoot = !0;
            this.root.divideBox()
        };
        a(d.prototype, {
            insertNodes: function(a) {
                a.forEach(function(a) {
                    this.root.insert(a, this.maxDepth)
                }, this)
            },
            visitNodeRecursive: function(a, b, d) {
                var g;
                a || (a = this.root);
                a === this.root && b && (g = b(a));
                !1 !== g && (a.nodes.forEach(function(a) {
                    if (a.isInternal) {
                        b && (g = b(a));
                        if (!1 === g) return;
                        this.visitNodeRecursive(a, b, d)
                    } else a.body && b && b(a.body);
                    d && d(a)
                }, this), a === this.root && d && d(a))
            },
            calculateMassAndCenter: function() {
                this.visitNodeRecursive(null, null, function(a) {
                    a.updateMassAndCenter()
                })
            }
        })
    });
    C(d, "Series/Networkgraph/Layouts.js", [d["Core/Chart/Chart.js"], d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, a, g) {
        var h = g.addEvent,
            b = g.clamp,
            r = g.defined,
            t = g.extend,
            x = g.isFunction,
            B = g.pick,
            z = g.setAnimation;
        a.layouts = {
            "reingold-fruchterman": function() {}
        };
        t(a.layouts["reingold-fruchterman"].prototype, {
            init: function(b) {
                this.options = b;
                this.nodes = [];
                this.links = [];
                this.series = [];
                this.box = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                this.setInitialRendering(!0);
                this.integration = a.networkgraphIntegrations[b.integration];
                this.enableSimulation = b.enableSimulation;
                this.attractiveForce = B(b.attractiveForce, this.integration.attractiveForceFunction);
                this.repulsiveForce = B(b.repulsiveForce, this.integration.repulsiveForceFunction);
                this.approximation = b.approximation
            },
            updateSimulation: function(a) {
                this.enableSimulation = B(a, this.options.enableSimulation)
            },
            start: function() {
                var a = this.series,
                    b = this.options;
                this.currentStep = 0;
                this.forces = a[0] && a[0].forces || [];
                this.chart = a[0] && a[0].chart;
                this.initialRendering && (this.initPositions(), a.forEach(function(a) {
                    a.finishedAnimating = !0;
                    a.render()
                }));
                this.setK();
                this.resetSimulation(b);
                this.enableSimulation && this.step()
            },
            step: function() {
                var b = this,
                    d = this.series;
                b.currentStep++;
                "barnes-hut" ===
                b.approximation && (b.createQuadTree(), b.quadTree.calculateMassAndCenter());
                b.forces.forEach(function(a) {
                    b[a + "Forces"](b.temperature)
                });
                b.applyLimits(b.temperature);
                b.temperature = b.coolDown(b.startTemperature, b.diffTemperature, b.currentStep);
                b.prevSystemTemperature = b.systemTemperature;
                b.systemTemperature = b.getSystemTemperature();
                b.enableSimulation && (d.forEach(function(a) {
                    a.chart && a.render()
                }), b.maxIterations-- && isFinite(b.temperature) && !b.isStable() ? (b.simulation && a.win.cancelAnimationFrame(b.simulation),
                    b.simulation = a.win.requestAnimationFrame(function() {
                        b.step()
                    })) : b.simulation = !1)
            },
            stop: function() {
                this.simulation && a.win.cancelAnimationFrame(this.simulation)
            },
            setArea: function(a, b, d, e) {
                this.box = {
                    left: a,
                    top: b,
                    width: d,
                    height: e
                }
            },
            setK: function() {
                this.k = this.options.linkLength || this.integration.getK(this)
            },
            addElementsToCollection: function(a, b) {
                a.forEach(function(a) {
                    -1 === b.indexOf(a) && b.push(a)
                })
            },
            removeElementFromCollection: function(a, b) {
                a = b.indexOf(a); - 1 !== a && b.splice(a, 1)
            },
            clear: function() {
                this.nodes.length =
                    0;
                this.links.length = 0;
                this.series.length = 0;
                this.resetSimulation()
            },
            resetSimulation: function() {
                this.forcedStop = !1;
                this.systemTemperature = 0;
                this.setMaxIterations();
                this.setTemperature();
                this.setDiffTemperature()
            },
            restartSimulation: function() {
                this.simulation ? this.resetSimulation() : (this.setInitialRendering(!1), this.enableSimulation ? this.start() : this.setMaxIterations(1), this.chart && this.chart.redraw(), this.setInitialRendering(!0))
            },
            setMaxIterations: function(a) {
                this.maxIterations = B(a, this.options.maxIterations)
            },
            setTemperature: function() {
                this.temperature = this.startTemperature = Math.sqrt(this.nodes.length)
            },
            setDiffTemperature: function() {
                this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1)
            },
            setInitialRendering: function(a) {
                this.initialRendering = a
            },
            createQuadTree: function() {
                this.quadTree = new a.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
                this.quadTree.insertNodes(this.nodes)
            },
            initPositions: function() {
                var a = this.options.initialPositions;
                x(a) ? (a.call(this), this.nodes.forEach(function(a) {
                    r(a.prevX) ||
                        (a.prevX = a.plotX);
                    r(a.prevY) || (a.prevY = a.plotY);
                    a.dispX = 0;
                    a.dispY = 0
                })) : "circle" === a ? this.setCircularPositions() : this.setRandomPositions()
            },
            setCircularPositions: function() {
                function a(c) {
                    c.linksFrom.forEach(function(c) {
                        k[c.toNode.id] || (k[c.toNode.id] = !0, h.push(c.toNode), a(c.toNode))
                    })
                }
                var b = this.box,
                    d = this.nodes,
                    e = 2 * Math.PI / (d.length + 1),
                    g = d.filter(function(a) {
                        return 0 === a.linksTo.length
                    }),
                    h = [],
                    k = {},
                    p = this.options.initialPositionRadius;
                g.forEach(function(c) {
                    h.push(c);
                    a(c)
                });
                h.length ? d.forEach(function(a) {
                    -1 ===
                        h.indexOf(a) && h.push(a)
                }) : h = d;
                h.forEach(function(a, f) {
                    a.plotX = a.prevX = B(a.plotX, b.width / 2 + p * Math.cos(f * e));
                    a.plotY = a.prevY = B(a.plotY, b.height / 2 + p * Math.sin(f * e));
                    a.dispX = 0;
                    a.dispY = 0
                })
            },
            setRandomPositions: function() {
                function a(a) {
                    a = a * a / Math.PI;
                    return a -= Math.floor(a)
                }
                var b = this.box,
                    d = this.nodes,
                    e = d.length + 1;
                d.forEach(function(d, l) {
                    d.plotX = d.prevX = B(d.plotX, b.width * a(l));
                    d.plotY = d.prevY = B(d.plotY, b.height * a(e + l));
                    d.dispX = 0;
                    d.dispY = 0
                })
            },
            force: function(a) {
                this.integration[a].apply(this, Array.prototype.slice.call(arguments,
                    1))
            },
            barycenterForces: function() {
                this.getBarycenter();
                this.force("barycenter")
            },
            getBarycenter: function() {
                var a = 0,
                    b = 0,
                    d = 0;
                this.nodes.forEach(function(e) {
                    b += e.plotX * e.mass;
                    d += e.plotY * e.mass;
                    a += e.mass
                });
                return this.barycenter = {
                    x: b,
                    y: d,
                    xFactor: b / a,
                    yFactor: d / a
                }
            },
            barnesHutApproximation: function(a, b) {
                var d = this.getDistXY(a, b),
                    e = this.vectorLength(d);
                if (a !== b && 0 !== e)
                    if (b.isInternal)
                        if (b.boxSize / e < this.options.theta && 0 !== e) {
                            var l = this.repulsiveForce(e, this.k);
                            this.force("repulsive", a, l * b.mass, d, e);
                            var g = !1
                        } else g = !0;
                else l = this.repulsiveForce(e, this.k), this.force("repulsive", a, l * b.mass, d, e);
                return g
            },
            repulsiveForces: function() {
                var a = this;
                "barnes-hut" === a.approximation ? a.nodes.forEach(function(b) {
                    a.quadTree.visitNodeRecursive(null, function(d) {
                        return a.barnesHutApproximation(b, d)
                    })
                }) : a.nodes.forEach(function(b) {
                    a.nodes.forEach(function(d) {
                        if (b !== d && !b.fixedPosition) {
                            var e = a.getDistXY(b, d);
                            var l = a.vectorLength(e);
                            if (0 !== l) {
                                var g = a.repulsiveForce(l, a.k);
                                a.force("repulsive", b, g * d.mass, e, l)
                            }
                        }
                    })
                })
            },
            attractiveForces: function() {
                var a =
                    this,
                    b, d, e;
                a.links.forEach(function(g) {
                    g.fromNode && g.toNode && (b = a.getDistXY(g.fromNode, g.toNode), d = a.vectorLength(b), 0 !== d && (e = a.attractiveForce(d, a.k), a.force("attractive", g, e, b, d)))
                })
            },
            applyLimits: function() {
                var a = this;
                a.nodes.forEach(function(b) {
                    b.fixedPosition || (a.integration.integrate(a, b), a.applyLimitBox(b, a.box), b.dispX = 0, b.dispY = 0)
                })
            },
            applyLimitBox: function(a, d) {
                var g = a.radius;
                a.plotX = b(a.plotX, d.left + g, d.width - g);
                a.plotY = b(a.plotY, d.top + g, d.height - g)
            },
            coolDown: function(a, b, d) {
                return a - b *
                    d
            },
            isStable: function() {
                return .00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature
            },
            getSystemTemperature: function() {
                return this.nodes.reduce(function(a, b) {
                    return a + b.temperature
                }, 0)
            },
            vectorLength: function(a) {
                return Math.sqrt(a.x * a.x + a.y * a.y)
            },
            getDistR: function(a, b) {
                a = this.getDistXY(a, b);
                return this.vectorLength(a)
            },
            getDistXY: function(a, b) {
                var d = a.plotX - b.plotX;
                a = a.plotY - b.plotY;
                return {
                    x: d,
                    y: a,
                    absX: Math.abs(d),
                    absY: Math.abs(a)
                }
            }
        });
        h(d, "predraw", function() {
            this.graphLayoutsLookup &&
                this.graphLayoutsLookup.forEach(function(a) {
                    a.stop()
                })
        });
        h(d, "render", function() {
            function a(a) {
                a.maxIterations-- && isFinite(a.temperature) && !a.isStable() && !a.enableSimulation && (a.beforeStep && a.beforeStep(), a.step(), d = !1, b = !0)
            }
            var b = !1;
            if (this.graphLayoutsLookup) {
                z(!1, this);
                for (this.graphLayoutsLookup.forEach(function(a) {
                        a.start()
                    }); !d;) {
                    var d = !0;
                    this.graphLayoutsLookup.forEach(a)
                }
                b && this.series.forEach(function(a) {
                    a && a.layout && a.render()
                })
            }
        });
        h(d, "beforePrint", function() {
            this.graphLayoutsLookup && (this.graphLayoutsLookup.forEach(function(a) {
                    a.updateSimulation(!1)
                }),
                this.redraw())
        });
        h(d, "afterPrint", function() {
            this.graphLayoutsLookup && this.graphLayoutsLookup.forEach(function(a) {
                a.updateSimulation()
            });
            this.redraw()
        })
    });
    C(d, "Series/PackedBubbleSeries.js", [d["Core/Chart/Chart.js"], d["Core/Color.js"], d["Core/Globals.js"], d["Core/Series/Point.js"], d["Core/Utilities.js"]], function(d, a, g, h, b) {
        var r = a.parse,
            t = b.addEvent,
            x = b.clamp,
            B = b.defined,
            z = b.extend;
        a = b.extendClass;
        var l = b.fireEvent,
            m = b.isArray,
            v = b.isNumber,
            e = b.merge,
            y = b.pick;
        b = b.seriesType;
        var w = g.Series,
            k = g.layouts["reingold-fruchterman"],
            p = g.dragNodesMixin;
        d.prototype.getSelectedParentNodes = function() {
            var a = [];
            this.series.forEach(function(c) {
                c.parentNode && c.parentNode.selected && a.push(c.parentNode)
            });
            return a
        };
        g.networkgraphIntegrations.packedbubble = {
            repulsiveForceFunction: function(a, f, b, d) {
                return Math.min(a, (b.marker.radius + d.marker.radius) / 2)
            },
            barycenter: function() {
                var a = this,
                    f = a.options.gravitationalConstant,
                    b = a.box,
                    d = a.nodes,
                    e, q;
                d.forEach(function(c) {
                    a.options.splitSeries && !c.isParentNode ? (e = c.series.parentNode.plotX, q = c.series.parentNode.plotY) :
                        (e = b.width / 2, q = b.height / 2);
                    c.fixedPosition || (c.plotX -= (c.plotX - e) * f / (c.mass * Math.sqrt(d.length)), c.plotY -= (c.plotY - q) * f / (c.mass * Math.sqrt(d.length)))
                })
            },
            repulsive: function(a, f, b, d) {
                var c = f * this.diffTemperature / a.mass / a.degree;
                f = b.x * c;
                b = b.y * c;
                a.fixedPosition || (a.plotX += f, a.plotY += b);
                d.fixedPosition || (d.plotX -= f, d.plotY -= b)
            },
            integrate: g.networkgraphIntegrations.verlet.integrate,
            getK: g.noop
        };
        g.layouts.packedbubble = a(k, {
            beforeStep: function() {
                this.options.marker && this.series.forEach(function(a) {
                    a && a.calculateParentRadius()
                })
            },
            setCircularPositions: function() {
                var a = this,
                    f = a.box,
                    b = a.nodes,
                    d = 2 * Math.PI / (b.length + 1),
                    e, q, g = a.options.initialPositionRadius;
                b.forEach(function(c, b) {
                    a.options.splitSeries && !c.isParentNode ? (e = c.series.parentNode.plotX, q = c.series.parentNode.plotY) : (e = f.width / 2, q = f.height / 2);
                    c.plotX = c.prevX = y(c.plotX, e + g * Math.cos(c.index || b * d));
                    c.plotY = c.prevY = y(c.plotY, q + g * Math.sin(c.index || b * d));
                    c.dispX = 0;
                    c.dispY = 0
                })
            },
            repulsiveForces: function() {
                var a = this,
                    f, b, d, e = a.options.bubblePadding;
                a.nodes.forEach(function(c) {
                    c.degree =
                        c.mass;
                    c.neighbours = 0;
                    a.nodes.forEach(function(n) {
                        f = 0;
                        c === n || c.fixedPosition || !a.options.seriesInteraction && c.series !== n.series || (d = a.getDistXY(c, n), b = a.vectorLength(d) - (c.marker.radius + n.marker.radius + e), 0 > b && (c.degree += .01, c.neighbours++, f = a.repulsiveForce(-b / Math.sqrt(c.neighbours), a.k, c, n)), a.force("repulsive", c, f * n.mass, d, n, b))
                    })
                })
            },
            applyLimitBox: function(a) {
                if (this.options.splitSeries && !a.isParentNode && this.options.parentNodeLimit) {
                    var c = this.getDistXY(a, a.series.parentNode);
                    var b = a.series.parentNodeRadius -
                        a.marker.radius - this.vectorLength(c);
                    0 > b && b > -2 * a.marker.radius && (a.plotX -= .01 * c.x, a.plotY -= .01 * c.y)
                }
                k.prototype.applyLimitBox.apply(this, arguments)
            }
        });
        b("packedbubble", "bubble", {
            minSize: "10%",
            maxSize: "50%",
            sizeBy: "area",
            zoneAxis: "y",
            crisp: !1,
            tooltip: {
                pointFormat: "Value: {point.value}"
            },
            draggable: !0,
            useSimulation: !0,
            parentNode: {
                allowPointSelect: !1
            },
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                parentNodeFormatter: function() {
                    return this.name
                },
                parentNodeTextPath: {
                    enabled: !0
                },
                padding: 0,
                style: {
                    transition: "opacity 2000ms"
                }
            },
            layoutAlgorithm: {
                initialPositions: "circle",
                initialPositionRadius: 20,
                bubblePadding: 5,
                parentNodeLimit: !1,
                seriesInteraction: !0,
                dragBetweenSeries: !1,
                parentNodeOptions: {
                    maxIterations: 400,
                    gravitationalConstant: .03,
                    maxSpeed: 50,
                    initialPositionRadius: 100,
                    seriesInteraction: !0,
                    marker: {
                        fillColor: null,
                        fillOpacity: 1,
                        lineWidth: 1,
                        lineColor: null,
                        symbol: "circle"
                    }
                },
                enableSimulation: !0,
                type: "packedbubble",
                integration: "packedbubble",
                maxIterations: 1E3,
                splitSeries: !1,
                maxSpeed: 5,
                gravitationalConstant: .01,
                friction: -.981
            }
        }, {
            hasDraggableNodes: !0,
            forces: ["barycenter", "repulsive"],
            pointArrayMap: ["value"],
            trackerGroups: ["group", "dataLabelsGroup", "parentNodesGroup"],
            pointValKey: "value",
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            axisTypes: [],
            noSharedTooltip: !0,
            searchPoint: g.noop,
            accumulateAllPoints: function(a) {
                var c = a.chart,
                    b = [],
                    d, e;
                for (d = 0; d < c.series.length; d++)
                    if (a = c.series[d], a.is("packedbubble") && a.visible || !c.options.chart.ignoreHiddenSeries)
                        for (e = 0; e < a.yData.length; e++) b.push([null, null, a.yData[e], a.index, e, {
                            id: e,
                            marker: {
                                radius: 0
                            }
                        }]);
                return b
            },
            init: function() {
                w.prototype.init.apply(this, arguments);
                t(this, "updatedData", function() {
                    this.chart.series.forEach(function(a) {
                        a.type === this.type && (a.isDirty = !0)
                    }, this)
                });
                return this
            },
            render: function() {
                var a = [];
                w.prototype.render.apply(this, arguments);
                this.options.dataLabels.allowOverlap || (this.data.forEach(function(c) {
                    m(c.dataLabels) && c.dataLabels.forEach(function(c) {
                        a.push(c)
                    })
                }), this.options.useSimulation && this.chart.hideOverlappingLabels(a))
            },
            setVisible: function() {
                var a =
                    this;
                w.prototype.setVisible.apply(a, arguments);
                a.parentNodeLayout && a.graph ? a.visible ? (a.graph.show(), a.parentNode.dataLabel && a.parentNode.dataLabel.show()) : (a.graph.hide(), a.parentNodeLayout.removeElementFromCollection(a.parentNode, a.parentNodeLayout.nodes), a.parentNode.dataLabel && a.parentNode.dataLabel.hide()) : a.layout && (a.visible ? a.layout.addElementsToCollection(a.points, a.layout.nodes) : a.points.forEach(function(c) {
                    a.layout.removeElementFromCollection(c, a.layout.nodes)
                }))
            },
            drawDataLabels: function() {
                var a =
                    this.options.dataLabels.textPath,
                    b = this.points;
                w.prototype.drawDataLabels.apply(this, arguments);
                this.parentNode && (this.parentNode.formatPrefix = "parentNode", this.points = [this.parentNode], this.options.dataLabels.textPath = this.options.dataLabels.parentNodeTextPath, w.prototype.drawDataLabels.apply(this, arguments), this.points = b, this.options.dataLabels.textPath = a)
            },
            seriesBox: function() {
                var a = this.chart,
                    b = Math.max,
                    d = Math.min,
                    e, g = [a.plotLeft, a.plotLeft + a.plotWidth, a.plotTop, a.plotTop + a.plotHeight];
                this.data.forEach(function(a) {
                    B(a.plotX) &&
                        B(a.plotY) && a.marker.radius && (e = a.marker.radius, g[0] = d(g[0], a.plotX - e), g[1] = b(g[1], a.plotX + e), g[2] = d(g[2], a.plotY - e), g[3] = b(g[3], a.plotY + e))
                });
                return v(g.width / g.height) ? g : null
            },
            calculateParentRadius: function() {
                var a = this.seriesBox();
                this.parentNodeRadius = x(Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20, 20, a ? Math.max(Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height, 2)) / 2 + 20, 20) : Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20);
                this.parentNode && (this.parentNode.marker.radius = this.parentNode.radius = this.parentNodeRadius)
            },
            drawGraph: function() {
                if (this.layout && this.layout.options.splitSeries) {
                    var a = this.chart,
                        b = this.layout.options.parentNodeOptions.marker;
                    b = {
                        fill: b.fillColor || r(this.color).brighten(.4).get(),
                        opacity: b.fillOpacity,
                        stroke: b.lineColor || this.color,
                        "stroke-width": b.lineWidth
                    };
                    var d = this.visible ? "inherit" : "hidden";
                    this.parentNodesGroup || (this.parentNodesGroup = this.plotGroup("parentNodesGroup", "parentNode", d, .1, a.seriesGroup), this.group.attr({
                        zIndex: 2
                    }));
                    this.calculateParentRadius();
                    d = e({
                        x: this.parentNode.plotX -
                            this.parentNodeRadius,
                        y: this.parentNode.plotY - this.parentNodeRadius,
                        width: 2 * this.parentNodeRadius,
                        height: 2 * this.parentNodeRadius
                    }, b);
                    this.parentNode.graphic || (this.graph = this.parentNode.graphic = a.renderer.symbol(b.symbol).add(this.parentNodesGroup));
                    this.parentNode.graphic.attr(d)
                }
            },
            createParentNodes: function() {
                var a = this,
                    b = a.chart,
                    d = a.parentNodeLayout,
                    e, g = a.parentNode,
                    q = a.pointClass;
                a.parentNodeMass = 0;
                a.points.forEach(function(c) {
                    a.parentNodeMass += Math.PI * Math.pow(c.marker.radius, 2)
                });
                a.calculateParentRadius();
                d.nodes.forEach(function(c) {
                    c.seriesIndex === a.index && (e = !0)
                });
                d.setArea(0, 0, b.plotWidth, b.plotHeight);
                e || (g || (g = (new q).init(this, {
                    mass: a.parentNodeRadius / 2,
                    marker: {
                        radius: a.parentNodeRadius
                    },
                    dataLabels: {
                        inside: !1
                    },
                    dataLabelOnNull: !0,
                    degree: a.parentNodeRadius,
                    isParentNode: !0,
                    seriesIndex: a.index
                })), a.parentNode && (g.plotX = a.parentNode.plotX, g.plotY = a.parentNode.plotY), a.parentNode = g, d.addElementsToCollection([a], d.series), d.addElementsToCollection([g], d.nodes))
            },
            drawTracker: function() {
                var a = this.parentNode;
                g.TrackerMixin.drawTrackerPoint.call(this);
                if (a) {
                    var b = m(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    b.forEach(function(c) {
                        c.div ? c.div.point = a : c.element.point = a
                    })
                }
            },
            addSeriesLayout: function() {
                var a = this.options.layoutAlgorithm,
                    b = this.chart.graphLayoutsStorage,
                    d = this.chart.graphLayoutsLookup,
                    h = e(a, a.parentNodeOptions, {
                        enableSimulation: this.layout.options.enableSimulation
                    });
                var l = b[a.type + "-series"];
                l || (b[a.type + "-series"] = l = new g.layouts[a.type], l.init(h),
                    d.splice(l.index, 0, l));
                this.parentNodeLayout = l;
                this.createParentNodes()
            },
            addLayout: function() {
                var a = this.options.layoutAlgorithm,
                    b = this.chart.graphLayoutsStorage,
                    d = this.chart.graphLayoutsLookup,
                    e = this.chart.options.chart;
                b || (this.chart.graphLayoutsStorage = b = {}, this.chart.graphLayoutsLookup = d = []);
                var h = b[a.type];
                h || (a.enableSimulation = B(e.forExport) ? !e.forExport : a.enableSimulation, b[a.type] = h = new g.layouts[a.type], h.init(a), d.splice(h.index, 0, h));
                this.layout = h;
                this.points.forEach(function(a) {
                    a.mass =
                        2;
                    a.degree = 1;
                    a.collisionNmb = 1
                });
                h.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
                h.addElementsToCollection([this], h.series);
                h.addElementsToCollection(this.points, h.nodes)
            },
            deferLayout: function() {
                var a = this.options.layoutAlgorithm;
                this.visible && (this.addLayout(), a.splitSeries && this.addSeriesLayout())
            },
            translate: function() {
                var a = this.chart,
                    b = this.data,
                    d = this.index,
                    e, g = this.options.useSimulation;
                this.processedXData = this.xData;
                this.generatePoints();
                B(a.allDataPoints) || (a.allDataPoints = this.accumulateAllPoints(this),
                    this.getPointRadius());
                if (g) var q = a.allDataPoints;
                else q = this.placeBubbles(a.allDataPoints), this.options.draggable = !1;
                for (e = 0; e < q.length; e++)
                    if (q[e][3] === d) {
                        var h = b[q[e][4]];
                        var k = q[e][2];
                        g || (h.plotX = q[e][0] - a.plotLeft + a.diffX, h.plotY = q[e][1] - a.plotTop + a.diffY);
                        h.marker = z(h.marker, {
                            radius: k,
                            width: 2 * k,
                            height: 2 * k
                        });
                        h.radius = k
                    }
                g && this.deferLayout();
                l(this, "afterTranslate")
            },
            checkOverlap: function(a, b) {
                var c = a[0] - b[0],
                    f = a[1] - b[1];
                return -.001 > Math.sqrt(c * c + f * f) - Math.abs(a[2] + b[2])
            },
            positionBubble: function(a,
                b, d) {
                var c = Math.sqrt,
                    f = Math.asin,
                    n = Math.acos,
                    e = Math.pow,
                    g = Math.abs;
                c = c(e(a[0] - b[0], 2) + e(a[1] - b[1], 2));
                n = n((e(c, 2) + e(d[2] + b[2], 2) - e(d[2] + a[2], 2)) / (2 * (d[2] + b[2]) * c));
                f = f(g(a[0] - b[0]) / c);
                a = (0 > a[1] - b[1] ? 0 : Math.PI) + n + f * (0 > (a[0] - b[0]) * (a[1] - b[1]) ? 1 : -1);
                return [b[0] + (b[2] + d[2]) * Math.sin(a), b[1] - (b[2] + d[2]) * Math.cos(a), d[2], d[3], d[4]]
            },
            placeBubbles: function(a) {
                var b = this.checkOverlap,
                    c = this.positionBubble,
                    d = [],
                    e = 1,
                    g = 0,
                    h = 0;
                var l = [];
                var k;
                a = a.sort(function(a, b) {
                    return b[2] - a[2]
                });
                if (a.length) {
                    d.push([
                        [0, 0, a[0][2],
                            a[0][3], a[0][4]
                        ]
                    ]);
                    if (1 < a.length)
                        for (d.push([
                                [0, 0 - a[1][2] - a[0][2], a[1][2], a[1][3], a[1][4]]
                            ]), k = 2; k < a.length; k++) a[k][2] = a[k][2] || 1, l = c(d[e][g], d[e - 1][h], a[k]), b(l, d[e][0]) ? (d.push([]), h = 0, d[e + 1].push(c(d[e][g], d[e][0], a[k])), e++, g = 0) : 1 < e && d[e - 1][h + 1] && b(l, d[e - 1][h + 1]) ? (h++, d[e].push(c(d[e][g], d[e - 1][h], a[k])), g++) : (g++, d[e].push(l));
                    this.chart.stages = d;
                    this.chart.rawPositions = [].concat.apply([], d);
                    this.resizeRadius();
                    l = this.chart.rawPositions
                }
                return l
            },
            resizeRadius: function() {
                var a = this.chart,
                    b = a.rawPositions,
                    d = Math.min,
                    e = Math.max,
                    g = a.plotLeft,
                    h = a.plotTop,
                    l = a.plotHeight,
                    k = a.plotWidth,
                    m, p, r;
                var t = m = Number.POSITIVE_INFINITY;
                var v = p = Number.NEGATIVE_INFINITY;
                for (r = 0; r < b.length; r++) {
                    var w = b[r][2];
                    t = d(t, b[r][0] - w);
                    v = e(v, b[r][0] + w);
                    m = d(m, b[r][1] - w);
                    p = e(p, b[r][1] + w)
                }
                r = [v - t, p - m];
                d = d.apply([], [(k - g) / r[0], (l - h) / r[1]]);
                if (1e-10 < Math.abs(d - 1)) {
                    for (r = 0; r < b.length; r++) b[r][2] *= d;
                    this.placeBubbles(b)
                } else a.diffY = l / 2 + h - m - (p - m) / 2, a.diffX = k / 2 + g - t - (v - t) / 2
            },
            calculateZExtremes: function() {
                var a = this.options.zMin,
                    b = this.options.zMax,
                    d = Infinity,
                    e = -Infinity;
                if (a && b) return [a, b];
                this.chart.series.forEach(function(a) {
                    a.yData.forEach(function(a) {
                        B(a) && (a > e && (e = a), a < d && (d = a))
                    })
                });
                a = y(a, d);
                b = y(b, e);
                return [a, b]
            },
            getPointRadius: function() {
                var a = this,
                    b = a.chart,
                    d = a.options,
                    e = d.useSimulation,
                    g = Math.min(b.plotWidth, b.plotHeight),
                    h = {},
                    l = [],
                    k = b.allDataPoints,
                    m, p, r, t;
                ["minSize", "maxSize"].forEach(function(a) {
                    var b = parseInt(d[a], 10),
                        c = /%$/.test(d[a]);
                    h[a] = c ? g * b / 100 : b * Math.sqrt(k.length)
                });
                b.minRadius = m = h.minSize / Math.sqrt(k.length);
                b.maxRadius =
                    p = h.maxSize / Math.sqrt(k.length);
                var v = e ? a.calculateZExtremes() : [m, p];
                (k || []).forEach(function(b, c) {
                    r = e ? x(b[2], v[0], v[1]) : b[2];
                    t = a.getRadius(v[0], v[1], m, p, r);
                    0 === t && (t = null);
                    k[c][2] = t;
                    l.push(t)
                });
                a.radii = l
            },
            redrawHalo: p.redrawHalo,
            onMouseDown: p.onMouseDown,
            onMouseMove: p.onMouseMove,
            onMouseUp: function(a) {
                if (a.fixedPosition && !a.removed) {
                    var b, c, d = this.layout,
                        g = this.parentNodeLayout;
                    g && d.options.dragBetweenSeries && g.nodes.forEach(function(f) {
                        a && a.marker && f !== a.series.parentNode && (b = d.getDistXY(a, f), c =
                            d.vectorLength(b) - f.marker.radius - a.marker.radius, 0 > c && (f.series.addPoint(e(a.options, {
                                plotX: a.plotX,
                                plotY: a.plotY
                            }), !1), d.removeElementFromCollection(a, d.nodes), a.remove()))
                    });
                    p.onMouseUp.apply(this, arguments)
                }
            },
            destroy: function() {
                this.chart.graphLayoutsLookup && this.chart.graphLayoutsLookup.forEach(function(a) {
                    a.removeElementFromCollection(this, a.series)
                }, this);
                this.parentNode && (this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes), this.parentNode.dataLabel &&
                    (this.parentNode.dataLabel = this.parentNode.dataLabel.destroy()));
                g.Series.prototype.destroy.apply(this, arguments)
            },
            alignDataLabel: g.Series.prototype.alignDataLabel
        }, {
            destroy: function() {
                this.series.layout && this.series.layout.removeElementFromCollection(this, this.series.layout.nodes);
                return h.prototype.destroy.apply(this, arguments)
            },
            firePointEvent: function(a, b, d) {
                var c = this.series.options;
                if (this.isParentNode && c.parentNode) {
                    var f = c.allowPointSelect;
                    c.allowPointSelect = c.parentNode.allowPointSelect;
                    h.prototype.firePointEvent.apply(this,
                        arguments);
                    c.allowPointSelect = f
                } else h.prototype.firePointEvent.apply(this, arguments)
            },
            select: function(a, b) {
                var c = this.series.chart;
                this.isParentNode ? (c.getSelectedPoints = c.getSelectedParentNodes, h.prototype.select.apply(this, arguments), c.getSelectedPoints = g.Chart.prototype.getSelectedPoints) : h.prototype.select.apply(this, arguments)
            }
        });
        t(d, "beforeRedraw", function() {
            this.allDataPoints && delete this.allDataPoints
        });
        ""
    });
    C(d, "Extensions/Polar.js", [d["Core/Chart/Chart.js"], d["Core/Globals.js"], d["Extensions/Pane.js"],
        d["Core/Pointer.js"], d["Core/Renderer/SVG/SVGRenderer.js"], d["Core/Utilities.js"]
    ], function(d, a, g, h, b, r) {
        var t = r.addEvent,
            x = r.animObject,
            B = r.defined,
            z = r.find,
            l = r.isNumber,
            m = r.pick,
            v = r.splat,
            e = r.uniqueKey,
            y = r.wrap,
            w = a.Series,
            k = a.seriesTypes,
            p = w.prototype;
        h = h.prototype;
        p.searchPointByAngle = function(a) {
            var b = this.chart,
                c = this.xAxis.pane.center;
            return this.searchKDTree({
                clientX: 180 + -180 / Math.PI * Math.atan2(a.chartX - c[0] - b.plotLeft, a.chartY - c[1] - b.plotTop)
            })
        };
        p.getConnectors = function(a, b, c, d) {
            var f = d ? 1 :
                0;
            var e = 0 <= b && b <= a.length - 1 ? b : 0 > b ? a.length - 1 + b : 0;
            b = 0 > e - 1 ? a.length - (1 + f) : e - 1;
            f = e + 1 > a.length - 1 ? f : e + 1;
            var g = a[b];
            f = a[f];
            var n = g.plotX;
            g = g.plotY;
            var h = f.plotX;
            var l = f.plotY;
            f = a[e].plotX;
            e = a[e].plotY;
            n = (1.5 * f + n) / 2.5;
            g = (1.5 * e + g) / 2.5;
            h = (1.5 * f + h) / 2.5;
            var k = (1.5 * e + l) / 2.5;
            l = Math.sqrt(Math.pow(n - f, 2) + Math.pow(g - e, 2));
            var m = Math.sqrt(Math.pow(h - f, 2) + Math.pow(k - e, 2));
            n = Math.atan2(g - e, n - f);
            k = Math.PI / 2 + (n + Math.atan2(k - e, h - f)) / 2;
            Math.abs(n - k) > Math.PI / 2 && (k -= Math.PI);
            n = f + Math.cos(k) * l;
            g = e + Math.sin(k) * l;
            h = f + Math.cos(Math.PI +
                k) * m;
            k = e + Math.sin(Math.PI + k) * m;
            f = {
                rightContX: h,
                rightContY: k,
                leftContX: n,
                leftContY: g,
                plotX: f,
                plotY: e
            };
            c && (f.prevPointCont = this.getConnectors(a, b, !1, d));
            return f
        };
        p.toXY = function(a) {
            var b = this.chart,
                c = this.xAxis;
            var d = this.yAxis;
            var f = a.plotX,
                e = a.plotY,
                g = a.series,
                h = b.inverted,
                l = a.y,
                k = h ? f : d.len - e;
            h && g && !g.isRadialBar && (a.plotY = e = "number" === typeof l ? d.translate(l) || 0 : 0);
            a.rectPlotX = f;
            a.rectPlotY = e;
            d.center && (k += d.center[3] / 2);
            d = h ? d.postTranslate(e, k) : c.postTranslate(f, k);
            a.plotX = a.polarPlotX = d.x - b.plotLeft;
            a.plotY = a.polarPlotY = d.y - b.plotTop;
            this.kdByAngle ? (b = (f / Math.PI * 180 + c.pane.options.startAngle) % 360, 0 > b && (b += 360), a.clientX = b) : a.clientX = a.plotX
        };
        k.spline && (y(k.spline.prototype, "getPointSpline", function(a, b, c, d) {
            this.chart.polar ? d ? (a = this.getConnectors(b, d, !0, this.connectEnds), a = ["C", a.prevPointCont.rightContX, a.prevPointCont.rightContY, a.leftContX, a.leftContY, a.plotX, a.plotY]) : a = ["M", c.plotX, c.plotY] : a = a.call(this, b, c, d);
            return a
        }), k.areasplinerange && (k.areasplinerange.prototype.getPointSpline = k.spline.prototype.getPointSpline));
        t(w, "afterTranslate", function() {
            var b = this.chart;
            if (b.polar && this.xAxis) {
                (this.kdByAngle = b.tooltip && b.tooltip.shared) ? this.searchPoint = this.searchPointByAngle: this.options.findNearestPointBy = "xy";
                if (!this.preventPostTranslate)
                    for (var c = this.points, d = c.length; d--;) this.toXY(c[d]), !b.hasParallelCoordinates && !this.yAxis.reversed && c[d].y < this.yAxis.min && (c[d].isNull = !0);
                this.hasClipCircleSetter || (this.hasClipCircleSetter = !!this.eventsToUnbind.push(t(this, "afterRender", function() {
                    if (b.polar) {
                        var c = this.yAxis.pane.center;
                        this.clipCircle ? this.clipCircle.animate({
                            x: c[0],
                            y: c[1],
                            r: c[2] / 2,
                            innerR: c[3] / 2
                        }) : this.clipCircle = b.renderer.clipCircle(c[0], c[1], c[2] / 2, c[3] / 2);
                        this.group.clip(this.clipCircle);
                        this.setClip = a.noop
                    }
                })))
            }
        }, {
            order: 2
        });
        y(p, "getGraphPath", function(a, b) {
            var c = this,
                d;
            if (this.chart.polar) {
                b = b || this.points;
                for (d = 0; d < b.length; d++)
                    if (!b[d].isNull) {
                        var f = d;
                        break
                    }
                if (!1 !== this.options.connectEnds && "undefined" !== typeof f) {
                    this.connectEnds = !0;
                    b.splice(b.length, 0, b[f]);
                    var e = !0
                }
                b.forEach(function(a) {
                    "undefined" ===
                    typeof a.polarPlotY && c.toXY(a)
                })
            }
            d = a.apply(this, [].slice.call(arguments, 1));
            e && b.pop();
            return d
        });
        var c = function(b, c) {
            var d = this,
                f = this.chart,
                e = this.options.animation,
                g = this.group,
                h = this.markerGroup,
                n = this.xAxis.center,
                l = f.plotLeft,
                k = f.plotTop,
                p, r, t, v;
            if (f.polar)
                if (d.isRadialBar) c || (d.startAngleRad = m(d.translatedThreshold, d.xAxis.startAngleRad), a.seriesTypes.pie.prototype.animate.call(d, c));
                else {
                    if (f.renderer.isSVG)
                        if (e = x(e), d.is("column")) {
                            if (!c) {
                                var w = n[3] / 2;
                                d.points.forEach(function(a) {
                                    p = a.graphic;
                                    t = (r = a.shapeArgs) && r.r;
                                    v = r && r.innerR;
                                    p && r && (p.attr({
                                        r: w,
                                        innerR: w
                                    }), p.animate({
                                        r: t,
                                        innerR: v
                                    }, d.options.animation))
                                })
                            }
                        } else c ? (b = {
                            translateX: n[0] + l,
                            translateY: n[1] + k,
                            scaleX: .001,
                            scaleY: .001
                        }, g.attr(b), h && h.attr(b)) : (b = {
                            translateX: l,
                            translateY: k,
                            scaleX: 1,
                            scaleY: 1
                        }, g.animate(b, e), h && h.animate(b, e))
                }
            else b.call(this, c)
        };
        y(p, "animate", c);
        k.column && (w = k.arearange.prototype, k = k.column.prototype, k.polarArc = function(a, b, c, d) {
                var f = this.xAxis.center,
                    e = this.yAxis.len,
                    g = f[3] / 2;
                b = e - b + g;
                a = e - m(a, e) + g;
                this.yAxis.reversed &&
                    (0 > b && (b = g), 0 > a && (a = g));
                return {
                    x: f[0],
                    y: f[1],
                    r: b,
                    innerR: a,
                    start: c,
                    end: d
                }
            }, y(k, "animate", c), y(k, "translate", function(a) {
                var b = this.options,
                    c = b.stacking,
                    d = this.chart,
                    f = this.xAxis,
                    e = this.yAxis,
                    g = e.reversed,
                    h = e.center,
                    k = f.startAngleRad,
                    m = f.endAngleRad - k;
                this.preventPostTranslate = !0;
                a.call(this);
                if (f.isRadial) {
                    a = this.points;
                    f = a.length;
                    var p = e.translate(e.min);
                    var t = e.translate(e.max);
                    b = b.threshold || 0;
                    if (d.inverted && l(b)) {
                        var v = e.translate(b);
                        B(v) && (0 > v ? v = 0 : v > m && (v = m), this.translatedThreshold = v + k)
                    }
                    for (; f--;) {
                        b =
                            a[f];
                        var w = b.barX;
                        var z = b.x;
                        var y = b.y;
                        b.shapeType = "arc";
                        if (d.inverted) {
                            b.plotY = e.translate(y);
                            if (c && e.stacking) {
                                if (y = e.stacking.stacks[(0 > y ? "-" : "") + this.stackKey], this.visible && y && y[z] && !b.isNull) {
                                    var x = y[z].points[this.getStackIndicator(void 0, z, this.index).key];
                                    var C = e.translate(x[0]);
                                    x = e.translate(x[1]);
                                    B(C) && (C = r.clamp(C, 0, m))
                                }
                            } else C = v, x = b.plotY;
                            C > x && (x = [C, C = x][0]);
                            if (!g)
                                if (C < p) C = p;
                                else if (x > t) x = t;
                            else {
                                if (x < p || C > t) C = x = 0
                            } else if (x > p) x = p;
                            else if (C < t) C = t;
                            else if (C > p || x < t) C = x = m;
                            e.min > e.max && (C = x =
                                g ? m : 0);
                            C += k;
                            x += k;
                            h && (b.barX = w += h[3] / 2);
                            z = Math.max(w, 0);
                            y = Math.max(w + b.pointWidth, 0);
                            b.shapeArgs = {
                                x: h && h[0],
                                y: h && h[1],
                                r: y,
                                innerR: z,
                                start: C,
                                end: x
                            };
                            b.opacity = C === x ? 0 : void 0;
                            b.plotY = (B(this.translatedThreshold) && (C < this.translatedThreshold ? C : x)) - k
                        } else C = w + k, b.shapeArgs = this.polarArc(b.yBottom, b.plotY, C, C + b.pointWidth);
                        this.toXY(b);
                        d.inverted ? (w = e.postTranslate(b.rectPlotY, w + b.pointWidth / 2), b.tooltipPos = [w.x - d.plotLeft, w.y - d.plotTop]) : b.tooltipPos = [b.plotX, b.plotY];
                        h && (b.ttBelow = b.plotY > h[1])
                    }
                }
            }), k.findAlignments =
            function(a, b) {
                null === b.align && (b.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center");
                null === b.verticalAlign && (b.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle");
                return b
            }, w && (w.findAlignments = k.findAlignments), y(k, "alignDataLabel", function(a, b, c, d, e, g) {
                var f = this.chart,
                    h = m(d.inside, !!this.options.stacking);
                f.polar ? (a = b.rectPlotX / Math.PI * 180, f.inverted ? (this.forceDL = f.isInsidePlot(b.plotX, Math.round(b.plotY), !1), h && b.shapeArgs ? (e = b.shapeArgs, e = this.yAxis.postTranslate((e.start + e.end) /
                    2 - this.xAxis.startAngleRad, b.barX + b.pointWidth / 2), e = {
                    x: e.x - f.plotLeft,
                    y: e.y - f.plotTop
                }) : b.tooltipPos && (e = {
                    x: b.tooltipPos[0],
                    y: b.tooltipPos[1]
                }), d.align = m(d.align, "center"), d.verticalAlign = m(d.verticalAlign, "middle")) : this.findAlignments && (d = this.findAlignments(a, d)), p.alignDataLabel.call(this, b, c, d, e, g), this.isRadialBar && b.shapeArgs && b.shapeArgs.start === b.shapeArgs.end && c.hide(!0)) : a.call(this, b, c, d, e, g)
            }));
        y(h, "getCoordinates", function(a, b) {
            var c = this.chart,
                d = {
                    xAxis: [],
                    yAxis: []
                };
            c.polar ? c.axes.forEach(function(a) {
                var e =
                    a.isXAxis,
                    f = a.center;
                if ("colorAxis" !== a.coll) {
                    var g = b.chartX - f[0] - c.plotLeft;
                    f = b.chartY - f[1] - c.plotTop;
                    d[e ? "xAxis" : "yAxis"].push({
                        axis: a,
                        value: a.translate(e ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)), !0)
                    })
                }
            }) : d = a.call(this, b);
            return d
        });
        b.prototype.clipCircle = function(a, b, c, d) {
            var f = e(),
                g = this.createElement("clipPath").attr({
                    id: f
                }).add(this.defs);
            a = d ? this.arc(a, b, c, d, 0, 2 * Math.PI).add(g) : this.circle(a, b, c).add(g);
            a.id = f;
            a.clipPath = g;
            return a
        };
        t(d, "getAxes", function() {
            this.pane ||
                (this.pane = []);
            v(this.options.pane).forEach(function(a) {
                new g(a, this)
            }, this)
        });
        t(d, "afterDrawChartBox", function() {
            this.pane.forEach(function(a) {
                a.render()
            })
        });
        t(a.Series, "afterInit", function() {
            var a = this.chart;
            a.inverted && a.polar && (this.isRadialSeries = !0, this.is("column") && (this.isRadialBar = !0))
        });
        y(d.prototype, "get", function(a, b) {
            return z(this.pane, function(a) {
                return a.options.id === b
            }) || a.call(this, b)
        })
    });
    C(d, "masters/highcharts-more.src.js", [], function() {})
});
//# sourceMappingURL=highcharts-more.js.map