package com.pad.slaythespire;


import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.MediaController;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;


/**
 * A simple {@link Fragment} subclass.
 */
public class CardFragment extends Fragment {


    public CardFragment() {
        // Required empty public constructor
    }


    GridView gridView;
    ArrayList<Integer> cards;
    ArrayList<String> cardsName;
    CustomAdapter customAdapter;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        cards = new ArrayList<>();
        cardsName = new ArrayList<>();
        customAdapter = new CustomAdapter();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_card, container, false);
        try {
            BufferedReader r = new BufferedReader(new InputStreamReader(getActivity().getAssets().open("cards.txt")));
            StringBuilder total = new StringBuilder();
            String line;
            while ((line = r.readLine()) != null) {
                total.append(line).append('\n');
                cardsName.add(line);
            }
        }catch (IOException e) {
            e.printStackTrace();
        }



        Field[] drawablesFields = com.pad.slaythespire.R.drawable.class.getFields();
        for (Field field : drawablesFields) {
            try {
                if(cardsName.contains(field.getName())) {
                    cards.add(field.getInt(field));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        gridView = view.findViewById(R.id.grid_layout);
        gridView.setAdapter(customAdapter);
        gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                View newView = getLayoutInflater().inflate(R.layout.card_image,null);
                ImageView imageView = newView.findViewById(R.id.images);

                imageView.setImageResource(cards.get(i));
                builder.setView(newView);
                AlertDialog alertDialog = builder.create();
                alertDialog.getWindow().setBackgroundDrawableResource(android.R.color.transparent);

                alertDialog.show();

            }
        });

        return view;
    }

    private class CustomAdapter extends BaseAdapter {
        @Override
        public int getCount() {

            return cards.size();
        }

        @Override
        public Object getItem(int i) {

            return null;
        }

        @Override
        public long getItemId(int i) {

            return 0;
        }

        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            View view1 = getLayoutInflater().inflate(R.layout.card_image, null, false);
            ImageView image = view1.findViewById(R.id.images);
            image.setImageResource(cards.get(i));
            return view1;
        }
    }

}