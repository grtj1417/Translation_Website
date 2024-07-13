// ignore_for_file: non_constant_identifier_names, avoid_print

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'server.dart';

Future < String > translate(
    String translation_text, String orgin, String trans) async {
    var model = 'zh2id_kevin';
    if (orgin == "zh") {
        if (trans == "en") {
            model = 'zh2en_0406Osborn';
        } else if (trans == "id") {
            model = 'zh2id_kevin';
        } else if (trans == "tai") {
            model = 'zh2tai';
        } else if (trans == "hakka") {
            model = 'zh2hakka';
        }
    } else if (orgin == "en") {
        if (trans == "zh") {
            model = 'en2zh_0416Osborn';
        } else if (trans == "id") {
            model = 'en2id';
        } else if (trans == "tai") {
            model = 'en2tai';
        } else if (trans == "hakka") {
            model = 'en2hakka';
        }
    } else if (orgin == "id") {
        if (trans == "zh") {
            model = 'id2zh_kevin';
        } else if (trans == "tai") {
            model = 'id2tai';
        } else if (trans == "en") {
            model = 'id2en';
        } else if (trans == "hakka") {
            model = 'id2hakka';
        }
    } else if (orgin == "tai") {
        if (trans == "zh") {
            model = 'tai2zh';
        } else if (trans == "id") {
            model = "tai2id";
        } else if (trans == "en") {
            model = 'tai2en';
        } else if (trans == "hakka") {
            model = 'tai2hakka';
        }
    } else if (orgin == "hakka") {
        if (trans == "zh") {
            model = 'hakka2zh';
        } else if (trans == "id") {
            model = "hakka2id";
        } else if (trans == "en") {
            model = 'hakka2en';
        } else if (trans == "tai") {
            model = 'hakka2tai';
        }
    }

  final response = await http.post(
        Uri.parse(TRANS_SERVER),
        headers: <String, String>{
            'Content-Type': 'application/json',
    },
        body: jsonEncode(
            <String, String>{ "translation_text": translation_text, "model": model }),
    );

    if (response.statusCode == 200) {
        print("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
        var trans_response = jsonDecode(response.body);
        print(trans_response['after_translation']);
        return trans_response['after_translation'];
    } else {
        print("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
        print(response.statusCode.toString());
        print('Response body: ${response.body}');
        throw Exception('Failed to request server.');
    }
}